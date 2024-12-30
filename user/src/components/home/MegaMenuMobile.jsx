import React, { Fragment, useEffect } from 'react'

function MegaMenuMobile() {
    const handleAccordionClick = (event) => {
        event.target.classList.toggle("active");
        var panel = event.target.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      }
    
      useEffect(() => {
        const acc = document.querySelectorAll(".accordionMobile");
        acc.forEach((accordion) => {
          accordion.addEventListener("click", handleAccordionClick);
        });
        return () => {
          acc.forEach((accordion) => {
            accordion.removeEventListener("click", handleAccordionClick);
          });
        }
      }, []);
  return (
    <div className="accordionMenuDivMobile">
      <div className="accordionMenuDivInsideMobile">

        <button className="accordionMobile">
          <img
            src="https://cdn-icons-png.flaticon.com/128/739/739249.png"
            alt="1"
            className="accordionMenuIconMobile"
          />
          &nbsp; Men's Clothing
        </button>
        <div className="panelMobile">
          <ul>
            <li>
              <a href="#" className="accordionItemMobile">
                Mans Tshirt 1
              </a>
            </li>
            <li>
              <a href="#" className="accordionItemMobile">
                Mans Tshirt 2
              </a>
            </li>
          </ul>
        </div>

        <button className="accordionMobile">
          <img
            src="https://cdn-icons-png.flaticon.com/128/739/739249.png"
            alt="1"
            className="accordionMenuIconMobile"
          />
          &nbsp; Men's Clothing
        </button>
        <div className="panelMobile">
          <ul>
            <li>
              <a href="#" className="accordionItemMobile">
                Mans Tshirt 1
              </a>
            </li>
            <li>
              <a href="#" className="accordionItemMobile">
                Mans Tshirt 2
              </a>
            </li>
          </ul>
        </div>

        <button className="accordionMobile">
          <img
            src="https://cdn-icons-png.flaticon.com/128/739/739249.png"
            alt="1"
            className="accordionMenuIconMobile"
          />
          &nbsp; Men's Clothing
        </button>
        <div className="panelMobile">
          <ul>
            <li>
              <a href="#" className="accordionItemMobile">
                Mans Tshirt 1
              </a>
            </li>
            <li>
              <a href="#" className="accordionItemMobile">
                Mans Tshirt 2
              </a>
            </li>
          </ul>
        </div>

        <button className="accordionMobile">
          <img
            src="https://cdn-icons-png.flaticon.com/128/739/739249.png"
            alt="1"
            className="accordionMenuIconMobile"
          />
          &nbsp; Men's Clothing
        </button>
        <div className="panelMobile">
          <ul>
            <li>
              <a href="#" className="accordionItemMobile">
                Mans Tshirt 1
              </a>
            </li>
            <li>
              <a href="#" className="accordionItemMobile">
                Mans Tshirt 2
              </a>
            </li>
          </ul>
        </div>

        <button className="accordionMobile">
          <img
            src="https://cdn-icons-png.flaticon.com/128/739/739249.png"
            alt="1"
            className="accordionMenuIconMobile"
          />
          &nbsp; Men's Clothing
        </button>
        <div className="panelMobile">
          <ul>
            <li>
              <a href="#" className="accordionItemMobile">
                Mans Tshirt 1
              </a>
            </li>
            <li>
              <a href="#" className="accordionItemMobile">
                Mans Tshirt 2
              </a>
            </li>
          </ul>
        </div>

        <button className="accordionMobile">
          <img
            src="https://cdn-icons-png.flaticon.com/128/739/739249.png"
            alt="1"
            className="accordionMenuIconMobile"
          />
          &nbsp; Men's Clothing
        </button>
        <div className="panelMobile">
          <ul>
            <li>
              <a href="#" className="accordionItemMobile">
                Mans Tshirt 1
              </a>
            </li>
            <li>
              <a href="#" className="accordionItemMobile">
                Mans Tshirt 2
              </a>
            </li>
          </ul>
        </div>

        <button className="accordionMobile">
          <img
            src="https://cdn-icons-png.flaticon.com/128/739/739249.png"
            alt="1"
            className="accordionMenuIconMobile"
          />
          &nbsp; Men's Clothing
        </button>
        <div className="panelMobile">
          <ul>
            <li>
              <a href="#" className="accordionItemMobile">
                Mans Tshirt 1
              </a>
            </li>
            <li>
              <a href="#" className="accordionItemMobile">
                Mans Tshirt 2
              </a>
            </li>
          </ul>
        </div>

        <button className="accordionMobile">
          <img
            src="https://cdn-icons-png.flaticon.com/128/739/739249.png"
            alt="1"
            className="accordionMenuIconMobile"
          />
          &nbsp; Men's Clothing
        </button>
        <div className="panelMobile">
          <ul>
            <li>
              <a href="#" className="accordionItemMobile">
                Mans Tshirt 1
              </a>
            </li>
            <li>
              <a href="#" className="accordionItemMobile">
                Mans Tshirt 2
              </a>
            </li>
          </ul>
        </div>

      </div>
    </div>
  )
}

export default MegaMenuMobile