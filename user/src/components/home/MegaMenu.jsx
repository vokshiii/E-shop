import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

function MegaMenu({ data }) {
  const MenuItemClick = (e) => {
    e.target.classList.toggle("active");
    var panel = e.target.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  };

  const CatList = data;
  const MyView = CatList.map((catlist, i) => {
    return (
      <div key={i.toString()}>
        <button onClick={MenuItemClick} className="accordion">
          <img
            src={catlist.category_image}
            alt="1"
            className="accordionMenuIcon"
          />
          &nbsp; {catlist.category_name}
        </button>
        <div className="panel">
          <ul>
            {
            (catlist.subcategory_name).map((SubList, i) => {
              return (
                <li>
                  <Link to={"productsubcategory/"+catlist.category_name+"/"+SubList.subcategory_name} className="accordionItem">
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
    <div className="accordionMenuDiv">
      <div className="accordionMenuDivInside">{MyView}</div>
    </div>
  );
}

export default MegaMenu;
