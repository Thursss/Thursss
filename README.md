# **黑羊**

  从前有个国家，里面人人是贼。

  黑羊，体格中等，体躯匀称，略呈长方形。头呈三角形，鼻梁平直，两耳向前倾立，公、母羊绝大多数有角、有髯，公羊角粗大，呈镰刀状，略向后外侧扭转，母羊角较小，多向后上方弯曲，向外侧扭转。毛被光泽好，大多为黑色，少数为白色、黄色和杂色。毛被内层生长有短而稀的绒毛。

> ![黑羊](https://bkimg.cdn.bcebos.com/pic/a08b87d6277f9e2f99635d6a1b30e924b899f37a?x-bce-process=image/watermark,g_7,image_d2F0ZXIvYmFpa2U3Mg==,xp_5,yp_5)

# 提交规则

```
  <type>(<scope>): <subject>
  <BLANK LINE>
  <body>
  <BLANK LINE>
  <footer>
```

1. __type__
  * 主要type
  > feat:     增加新功能
    fix:      修复bug

  * 特殊type
  > docs:     只改动了文档相关的内容
    style:    不影响代码含义的改动，例如去掉空格、改变缩进、增删分号
    build:    构造工具的或者外部依赖的改动，例如webpack，npm
    refactor: 代码重构时使用
    revert:   执行git revert打印的message

  * 暂不使用type
  > test:     添加测试或者修改现有测试
    perf:     提高性能的改动
    ci:       与CI（持续集成服务）有关的改动
    chore:    不修改src或者test的其余修改，例如构建过程或辅助工具的变动
    file:     文件名称或者路径改动

2. __scope__
 scope也为必填项，用于描述改动的范围，格式为项目名/模块名，例如：
  node-pc/common rrd-h5/activity，而we-sdk不需指定模块名。如果一次commit修改多个模块，建议拆分成多次commit，以便更好追踪和维护。

3. __body__
body填写详细描述，主要描述改动之前的情况及修改动机，对于小的修改不作要求，但是重大需求、更新等必须添加body来作说明。

4. __break changes__
break changes指明是否产生了破坏性修改，涉及break changes的改动必须指明该项，类似版本升级、接口参数减少、接口删除、迁移等。

5. __affect issues__
affect issues指明是否影响了某个问题。例如我们使用jira时，我们在commit message中可以填写其影响的JIRA_ID，若要开启该功能需要先打通jira与gitlab。