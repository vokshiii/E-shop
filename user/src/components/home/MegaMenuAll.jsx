import React, { useEffect, useState } from 'react'
import AppURL from '../../api/AppURL';
import axios from 'axios';
import { Link } from 'react-router-dom';

function MegaMenuAll() {
  const [MenuData, setMenuData] = useState([]);

  useEffect(() => {
    axios
      .get(AppURL.AllCategoryDetails)
      .then((response) => {
        setMenuData(response.data);
      })
      .catch((error) => {});
  }, []);

  const MenuItemClick = (e) => {
    e.target.classList.toggle("active");
    var panel = e.target.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  };
  const CatList = MenuData;
  const MyView = CatList.map((catlist, i) => {
    return (
      <div key={i.toString()}>
        <button onClick={MenuItemClick} className="accordionAll">
          <img
            src={catlist.category_image}
            alt="1"
            className="accordionMenuIconAll"
          />
          &nbsp; {catlist.category_name}
        </button>
        <div className="panelAll">
          <ul>
            {
            (catlist.subcategory_name).map((SubList, i) => {
              return (
                <li>
                  <Link to={"/productsubcategory/"+catlist.category_name+"/"+SubList.subcategory_name} className="accordionItem">
                    {SubList.subcategory_name}
                  </Link>
                </li>
              );
            })
            }
          </ul>
        </div>
      </div>
    );
  });
  return (
    <div className="accordionMenuDivAll">
     <div className="accordionMenuDivInsideAll">
      {MyView}
     </div>
  </div>
  )
}

export default MegaMenuAll