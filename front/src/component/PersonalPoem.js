import clsx from 'clsx'
import { useState } from 'react'
import './RelayPoem.css'
import {AiOutlineHeart, AiTwotoneHeart} from 'react-icons/ai';

function RelayPoem(props) {
    const {page, setPage} = props;
    const {heart,setHeart} = props;
  const {state, setState} = props;
//   const [state, setState] = useState([false,false,false,false,false,false]);
  const {poemList,setPoemList} = props;

  const itemsPerPage = 6;


  function onUpdateItem (e,a) {
    e.stopPropagation();
    let arr = new Array();
        for (let i = 0; i < state.length;i++) {
            console.log()
            if (i === a) arr.push(!state[i]);
            else arr.push(state[i]);
        }
        setState(arr);
  };

  function gotoItem (a) {
    var requestOptions = {
        method: 'PUT',
        headers: {"Content-Type": "application/json"}
        };
        var obj = new Object();
        fetch("/viewbook?bookid="+a.bookid, requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result);
        })
        .catch(error => console.log('error', error));
    console.log(a.bookid);
    window.location.href = `/poem/${a.bookid}`;
  };
    const showPoemList = poemList.map( (poem, index) => {
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
                        src = {`/image/${poem.genre}${poem.bookid%3}.jpg`}
                        alt=""
                    />
                    <h2 className="item__title">
                        {poem.bookname}
                    </h2>
                    <h3 className="item__likes">
                        <img
                            className="item__heart"
                            src = {`/image/heart.png`}
                            alt=""
                        />
                        {poem.likes}
                    </h3>
                    <h3 className="item__view">
                        <img
                            className="item__search"
                            src = {`/image/search.png`}
                            alt=""
                        />
                        {poem.view}
                    </h3>
                    </div>

                    <div className="item__back">
                    <h5 className="item__subtitle">
                        {poem.writer}
                    </h5>
                    <p className="item__desc">
                        {poem.content}
                    </p>
                    </div>

                    <button className="item__button" onClick={(e) => onUpdateItem(e,index)}>
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
