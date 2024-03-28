import cv2
import pytesseract
# 加载图片并预处理
image = cv2.imread('assets/text.png')
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]

#
# 识别文字并提取结果
text = pytesseract.image_to_string(thresh)
#
# 处理和显示结果
print(text)
#
# 可选：保存提取的文字为文件（以防止显示结果时出现编码问题）
with open('assets/output.txt', 'w', encoding='utf-8') as f:
    f.write(text)