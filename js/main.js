var result = `/*
  * 面试官你好，我是XXX
  * 我将以动画的形式来介绍我自己
  * 只用文字太单调了
  * 我就用代码来介绍吧
  * 首先准备一些样式
*/

  *{
      transition:all 1s ;
  }
  html{
      background:rgb(222,222,222);
      font-size:16px;
  }
  #code{
      border:3px solid orange;
      padding:16px;
      margin:10px;
  }

  /*添加一下代码高亮效果*/
.token.selector,
.token.attr-name,
.token.string,
.token.char, 
.token.builtin, 
.token.inserted
{
    color: #690;
}

.token.punctuation {
    color: #999;
}

.token.property,
.token.tag,
.token.boolean,
.token.number,
.token.constant,
.token.symbol,
.token.deleted {
    color: #905;
}

.token.function {
    color: #DD4A68;
}

/*加点动画效果*/
#code{
    animation: breath 1s infinite alternate-reverse;
}



/*下面我来介绍我自己*/
/*我需要一张白纸*/
#code{
    position:fixed;
    left:0;
    width:48%;
    height:100%;
}
`
var result2=`
#paper
{
    position:fixed;
    right:0;
    width:50%;
    height:100%;
    background:lightblue;
    display:flex;
    jusity-content:center;
    align-items:center;
    padding:16px;
}
#paper>.content{
    background:lightyellow;
    width:100%;
    height:100%; 
    padding:16px;   
}
}
`
var result3=`
/*
  * 接下来把 Markdown 变成html,这里使用到了 marked.js
*/
`
var result4=`
/*
  * 这就是我的动态简历
  * 谢谢观看
*/
`

var md=`
# 自我介绍

我叫** XXX **
1994年1月出生
XXX 学校毕业
自学前端半年
希望应聘前端开发岗位

# 技能介绍

熟悉 ** JavaScript ** 、** CSS **、

# 项目介绍
1.苹果风格轮播
2.canvas 在线画板
3.**在线音乐播放器**

# 我的联系方式
QQ:XXXXXXXXXX
电话:XXXXXXXXXX
Email:laklc295@gmail.com
`


writeCode('',result,()=>{
    createPaper(()=>{
            writeCode(result,result2,()=>{
                writeMarkdown(md,()=>{
                    writeCode(result+result2,result3,()=>{
                        markdownToHtml(()=>{
                            writeCode(result+result2+result3,result4)
                        })
                    })
                })
            })
    })
})

function markdownToHtml(fn){
    var domPaper = document.querySelector('#paper>.content')
    domPaper.innerHTML=marked(md);
    fn.call()
}



/* 下面是用到的函数 */
/* 把 code 写到 #code 和 style 标签里 */
function writeCode(prefix,code,fn ){
    let domCode = document.querySelector('#code')
    prefix=prefix || ''
    var n =0
    var id = setInterval(()=>{
        n+=1
        domCode.innerHTML=Prism.highlight(prefix+code.substring(0,n), Prism.languages.css)
        styleTag.innerHTML=prefix+code.substring(0,n)
        domCode.scrollTop=domCode.scrollHeight;
        if(n>=code.length){
            window.clearInterval(id)
            if(fn){
                fn.call()
            }
            
        }
    },0)
}

function writeMarkdown(markdown,fn){
    let domPaper = document.querySelector('#paper>.content')
    let n=0;
    var id = setInterval(()=>{
        n+=1
        domPaper.innerHTML=markdown.substring(0,n)
        domPaper.scrollTop=domPaper.scrollHeight;
        if(n>=markdown.length){
            window.clearInterval(id)
            if(fn){
                fn.call()
            }
            
        }
    },50)
}


function createPaper(fn){
    var paper = document.createElement('div')
    paper.id='paper'
    var content = document.createElement('pre')
    content.className='content'
    content.classList.add('markdown-body')
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn.call()
}


