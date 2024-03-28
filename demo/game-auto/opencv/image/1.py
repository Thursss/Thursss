import cv2

img = cv2.imread('assets/image.png', 0)
cv2.imshow('image_0', img)
k = cv2.waitKey(0)
if k == 115:
    cv2.imwrite('assets/image_0.png', img)