import clsx from 'clsx'
import { useState } from 'react'
import './RelayPoem.css'

function RelayPoem(props) {
    const {page, setPage} = props;
  const {statep, setStatep} = props;
  const {state, setState} = props;
//   const [state, setState] = useState([false,false,false,false,false,false]);
  const {poemList,setPoemList} = props;

  const itemsPerPage = 6;


  function onUpdateItem (a) {
    let arr = new Array();
        for (let i = 0; i < state.length;i++) {
            console.log()
            if (i === a) arr.push(!state[i]);
            else arr.push(state[i]);
        }
        setState(arr);
  };

  function onUpdateItemFalse (){
    let arr = new Array();
    for (let i = 0; i < state.length;i++) {
        arr.push(false);
    }
    setState(arr);
  }

  function gotoItem (a) {
      console.log(a);
  };
    const showPoemList = poemList.map( (poem, index) => {
        console.log(index);
        console.log(state);
        return (poemList[index] !== undefined ?
                <div key={index}
                className={clsx('section-content', {
                    'is-active': state[index],
                })}
                >
                <div className="item" onClick={() => gotoItem(poemList[index])}>
                    <div className="item__front">
                    <img
                        className="item__media"
                        src="https://www.apple.com/kr/app-store/a/images/overview/discovery_stories__fs202x3qvqye_large_2x.jpg"
                        alt=""
                    />
                    <h2 className="item__title">
                        밤 눈
                    </h2>
                    </div>

                    <div className="item__back">
                    <h3 className="item__subtitle">
                        김광석
                    </h3>
                    <p className="item__desc">
                        겨울 밤, 
                        노천역에서
                        전동차를 기다리며 우리는
                        서로의 집이 되고 싶었다
                        안으로 들어가
                        온갖 부끄러움 감출 수 있는
                        따스한 방이 되고 싶었다
                        눈이 내려도
                        바람이 불어도
                        날이 밝을 때까지 우리는
                        서로의 바깥이 되고 싶었다
                    </p>
                    </div>

                    <button className="item__button" onClick={() => onUpdateItem(index)}>
                    <svg viewBox="0 0 40 40" className="item__button__icon">
                        <path
                        id="reset"
                        d="M30.8,18.3h-9.2V9.2c0-0.8-0.8-1.7-1.7-1.7c-0.8,0-1.7,0.8-1.7,1.7v9.2H9.2c-0.8,0-1.7,0.8-1.7,1.7c0,0.8,0.8,1.7,1.7,1.7
                    h9.2v9.2c0,0.8,0.8,1.7,1.7,1.7c0.8,0,1.7-0.8,1.7-1.7v-9.2h9.2c0.8,0,1.7-0.8,1.7-1.7C32.5,19.2,31.7,18.3,30.8,18.3z"
                        ></path>
                    </svg>
                    </button>
                </div>
                </div>
                    : <></>
            )
        }
    )
  return(
    <div className='grid-container'>
        {showPoemList}
    </div>
  )
}



export default RelayPoem
