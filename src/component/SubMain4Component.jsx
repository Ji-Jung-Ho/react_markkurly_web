import axios from 'axios';
import React from 'react';

export default function SubMain4Component () {

  const [state, setState] = React.useState([]);

  const createScriptFn=(imgSrc)=>{
    const scriptTag = document.createElement('script');
    scriptTag.src = imgSrc;
    document.body.appendChild(scriptTag);
  }

  React.useEffect(()=>{
    createScriptFn("./js/category.js");
  })

  axios({
    url:"./data/banner.json",
    method:'GET'
  })
  .then((res)=>{
    setState(res.data.특가혜택);
  })
  .catch((err)=>{
    console.log(`AXIOS 실패 ${err}`);
  })

  return (
    <main id="main" className="main4">
    <section id="banner">
        <div className="container">
            <div className="title hide">
                <h1>banner</h1>
            </div>
            <div className="content">
                <ul className="banner-list">
                    {
                        state.map((item)=>{
                            return(
                                <li key={item.번호}>
                                    <a href="!#" title={item.제목}>
                                        <img src={`./img/main4/${item.이미지}`} alt={item.소개} />
                                    </a>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    </section>
</main>
  );
};