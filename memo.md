translate3d写代码细心点
标题原点的创建使用伪类

```
&::before{
                    content: "";
                    position: absolute;
                    background: #000000;
                    display: inline-block;
                    width: 8rpx;
                    height: 8rpx;
                    tramsform:translate(-50%,-%50)//居中
                    border-radius: 50%;
                    top: 24rpx;
                    left: -24rpx;//左移负右移是正
                }
```

子元素absolute父元素relative

子元素absolute父元素relative

小程序创建页面在js文件或者ts文件中加上page({})先，否则可能会无法使wxml文件中元素显示

css设置沾满全屏：height: 100vh;

伪类画线，不占用实际高度

```
.content-table{
  position: relative;
  margin-bottom:168*@rem ;
  padding-top: 8*@rem;
  margin-top: 49*@rem;
  &::before{
    position: absolute;
    content: " ";
    top: 0*@rem;
    left: 0*@rem;
    width: 311*@rem;
    height: 0.5*@rem;
    background: rgba(0,0,0,0.10);
  }
}
```

