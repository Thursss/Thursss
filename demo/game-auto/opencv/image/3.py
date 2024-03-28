import cv2
import numpy

img = numpy.zeros((521,521,3), numpy.uint8)
cv2.line(img, (0,0), (511,311), (255,0,0), 3)
cv2.rectangle(img,(384,0),(510,128),(0,255,10),3)
cv2.ellipse(img,(256,256),(100,50),0,0,180,255,-1)

font = cv2.FONT_HERSHEY_SIMPLEX
cv2.putText(img,'OpenCV',(10,500), font, 4,(255,255,255),2,cv2.LINE_AA)

cv2.imshow('img', img)
cv2.waitKey(0)
cv2.destroyAllWindows()