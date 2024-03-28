import cv2
import numpy as np
import pyautogui
import time

# 获取目标图片在屏幕中的位置
def find_target_image_position(target_img, screen_img):
    # 加载目标图像和屏幕图像
    target_img = cv2.imread(target_img)
    # screen_img = pyautogui.screenshot()
    screen_img = cv2.imread(screen_img)
    # screen_img = cv2.cvtColor(np.array(screen_img), cv2.COLOR_RGB2BGR)

    # 转换为灰度图像
    target_gray = cv2.cvtColor(target_img, cv2.COLOR_BGR2GRAY)
    screen_gray = cv2.cvtColor(screen_img, cv2.COLOR_BGR2GRAY)

    # 使用模板匹配算法
    result = cv2.matchTemplate(screen_gray, target_gray, cv2.TM_CCOEFF_NORMED)


    # 获取匹配结果的坐标
    min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)
    top_left = max_loc
    bottom_right = (top_left[0] + target_img.shape[1], top_left[1] + target_img.shape[0])

    target_center = ((top_left[0]+bottom_right[0])/2, (top_left[1]+bottom_right[1])/2)


    # 在屏幕图像中标记目标图像的位置
    cv2.rectangle(screen_img, top_left, bottom_right, (0, 255, 0), 2)

    # # 显示结果图像
    cv2.imshow('Result', screen_img)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

    return target_center, top_left, bottom_right

if __name__ == '__main__':
    result = find_target_image_position('./assets/icon.png', './assets/image.png')
    print(result)