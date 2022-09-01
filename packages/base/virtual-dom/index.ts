interface VNode {
  tag: string;
  props?: VNodeProps;
  children?: string | Array<VNode | string>;
}
interface VNodeProps {
  attr?: {
    id?: string;
    className?: string;
    [key: string]: string | number | undefined;
  };
}
interface PatchesProp {
  type: "MOD" | "DEL" | "NEW";
  prop: string;
  value?: string | number;
}
interface PatchesDom {
  type: "ChangeProps" | "ChangeInnerText" | "Replace";
  node?: VElement;
  value?: string;
  props?: PatchesProp[];
}
interface PatchesProps {
  [key: number]: PatchesDom[];
}

class VElement {
  tag: string;
  props?: VNodeProps;
  children?: (string | VNode | VElement)[];
  key?: string;
  el?: HTMLElement;
  constructor(
    tag: string,
    props?: VNodeProps,
    children?: string | Array<VNode | VElement | string>,
    key?: string
  ) {
    this.tag = tag;
    this.props = props;
    if (typeof children === "string") {
      this.key = children;
    } else {
      this.children = children;
    }
    if (key) this.key = key;
  }
  render() {
    const el = document.createElement(this.tag);
    const props = this.props ?? {};
    for (const key in props.attr) {
      if (key === "className") {
        el.setAttribute("class", props.attr?.[key] ?? "");
      } else {
        el.setAttribute(key, (props.attr?.[key] as any).toString() ?? "");
      }
    }
    const chileren = this.children ?? [];
    chileren.forEach((c) => {
      const childDom =
        c instanceof VElement
          ? c.render()
          : document.createTextNode(c as string);
      el.appendChild(childDom);
    });
    this.el = el;
    return el;
  }
}

function h(
  tag: string,
  props?: VNodeProps,
  children?: string | Array<VNode | string>
): VElement {
  return new VElement(tag, props, children);
}

function dfswalking(vNode: VNode) {
  if (
    !vNode.children ||
    vNode.children === "string" ||
    (vNode.children.length === 1 && typeof vNode.children[0] === "string")
  ) {
    console.log(
      `<${vNode.tag} class="${vNode.props?.attr?.className}">${vNode.children?.[0]}</${vNode.tag}>`
    );
  } else {
    console.log(`<${vNode.tag} class="${vNode.props?.attr?.className}">`);
    (vNode.children as Array<VNode>).forEach((vNode) => {
      dfswalking(vNode);
    });
    console.log(`</${vNode.tag}>`);
  }
}

function vDomDiff(oldDom: VElement, newDom: VElement) {
  let patches: PatchesProps = {};
  let globalIndex = 0; //遍历时为节点添加索引，方便打补丁时找到节点
  dfsWalk(oldDom, newDom, globalIndex, patches);
  console.log(patches);
  return patches;
}
function dfsWalk(
  oldDom: VElement,
  newDom: VElement,
  index: number,
  patches: PatchesProps
) {
  const currentPatches: PatchesDom[] = [];
  let nextIndex = index + 1;
  console.log(nextIndex, oldDom.el);
  if (!newDom) {
  } else {
    if (oldDom.tag === newDom.tag && oldDom.key === newDom.key) {
      const props = dfsProps(oldDom.props, newDom.props);
      if (props.length > 0) {
        currentPatches.push({
          type: "ChangeProps",
          props,
        });
      }
      if (oldDom.children && oldDom.children.length > 0) {
        oldDom.children?.forEach((c, i) => {
          if (c instanceof VElement) {
            nextIndex = dfsWalk(
              c,
              newDom.children?.[i] as VElement,
              nextIndex,
              patches
            );
          } else if (typeof c === "string") {
            if (c !== newDom.children?.[i]) {
              patches[nextIndex] = [
                {
                  type: "ChangeInnerText",
                  value: newDom.children?.[i] as string,
                },
              ];
            }
          }
        });
      }
    } else {
      currentPatches.push({
        type: "Replace",
        node: newDom,
      });
    }
  }
  if (currentPatches.length > 0) {
    if (patches[index]) {
      patches[index] = [...currentPatches, ...patches[index]];
    } else {
      patches[index] = currentPatches;
    }
  }
  return nextIndex;
}
function dfsProps(oldProps?: VNodeProps, newProps?: VNodeProps) {
  if (!oldProps && !newProps) return [];
  const currentPatches: PatchesProp[] = [];
  for (const key in oldProps?.attr) {
    if (newProps?.attr?.[key] === undefined) {
      currentPatches.push({
        type: "DEL",
        prop: key,
      });
    } else if (newProps.attr?.[key] !== oldProps?.attr[key]) {
      currentPatches.push({
        type: "MOD",
        prop: key,
        value: newProps.attr[key],
      });
    }
  }

  for (const key in newProps?.attr) {
    if (oldProps?.attr?.[key] === undefined) {
      currentPatches.push({
        type: "NEW",
        prop: key,
        value: newProps?.attr?.[key],
      });
    }
  }

  return currentPatches;
}
function dfsChildren(
  oldChildren: Array<VElement | VNode | string>,
  newChildren: Array<VElement | VNode | string> | undefined,
  index: number,
  patches: PatchesProps
) {
  (oldChildren as VElement[])?.forEach((c, i) => {
    if (c instanceof VElement) {
      index = dfsWalk(c, newChildren?.[i] as VElement, index, patches);
    } else if (typeof c === "string") {
      if (c !== newChildren?.[i]) {
        patches[index] = [
          {
            type: "ChangeInnerText",
            value: newChildren?.[i] as string,
          },
        ];
      }
    }
  });
  return index;
}

const tree = h("div", { attr: { className: "main", id: "body", cp: 0 } }, [
  h("div", { attr: { className: "sideBar" } }, [
    h("ul", { attr: { className: "sideBarContainer" } }, [
      h("li", { attr: { className: "sideBarItem" } }, ["page1"]),
      h("li", { attr: { className: "sideBarItem" } }, ["page2"]),
      h("li", { attr: { className: "sideBarItem" } }, ["page3"]),
    ]),
  ]),
  h("div", { attr: { className: "mainContent" } }, [
    h("div", { attr: { className: "header" } }, ["header zone"]),
    h("div", { attr: { className: "coreContent" } }, [
      h("div", { attr: { fx: 1 } }, ["flex1"]),
      h("div", { attr: { fx: 2 } }, ["flex2"]),
    ]),
    h("div", { attr: { className: "footer" } }, ["footer zone"]),
  ]),
]);

const app = document.getElementById("app");
app?.appendChild(tree.render());

const newTree = h("div", { attr: { className: "main", id: "body" } }, [
  //0
  h("div", { attr: { className: "sideBar", cp: 1 } }, [
    //1
    h("ul", { attr: { className: "sideBarContainer" } }, [
      //2
      h("li", { attr: { className: "sideBarItem" } }, ["page11"]), //3
      h("li", { attr: { className: "sideBarItem" } }, ["page2"]), //4
      h("li", { attr: { className: "sideBarItem" } }, ["page3"]), //5
    ]),
  ]),
  h("div", { attr: { className: "mainContent" } }, [
    //6
    h("div", { attr: { className: "header" } }, ["header zone"]), //7
    h("div", { attr: { className: "coreContent" } }, [
      //8
      h("div", { attr: { fx: 1 } }, ["flex1"]), //9
      h("div", { attr: { fx: 2 } }, ["flex2"]), //10
    ]),
    h("div", { attr: { className: "footer" } }, ["footer"]), //11
  ]),
]);

const patches = vDomDiff(tree, newTree);

function dfsPatches(
  oldTree: VElement,
  patches: PatchesProps,
  index: number = 0
) {
  let cuurentIndex = index + 1;

  // console.log(cuurentIndex, oldTree.el);
  if (patches[cuurentIndex] !== undefined) {
    changeDom(oldTree.el, patches[cuurentIndex]);
  }
  if (oldTree.children && oldTree.children.length > 0) {
    oldTree.children.forEach((c) => {
      if (c instanceof VElement) {
        cuurentIndex = dfsPatches(c as VElement, patches, cuurentIndex);
      }
    });
  }
  return cuurentIndex;
}

function changeDom(el: HTMLElement | undefined, patches: PatchesDom[]) {    
  console.log(el, patches);
}

dfsPatches(tree, patches);
