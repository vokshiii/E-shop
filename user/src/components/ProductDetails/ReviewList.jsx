import axios from "axios";
import React, { useEffect, useState } from "react";
import AppURL from "../../api/AppURL";

function ReviewList({ code }) {
  const [ReviewData, setReviewData] = useState([]);
  useEffect(() => {
    window.scroll(0, 0);
    axios
      .get(AppURL.ReviewList(code))
      .then((response) => {
        setReviewData(response.data);
      })
      .catch((error) => {});
  }, []);

  if (ReviewData.length > 0) {
    const MyView = ReviewData.map((ReviewList, i) => {
        if(ReviewList.reviewer_rating === "1"){
            return <div>
            <p className=" p-0 m-0">
              <span className="Review-Title">{ReviewList.reviewer_name}</span>{" "}
              <span className="text-success">
                <i className="fa fa-star"></i> 
              </span>{" "}
            </p>
            <p>
              {ReviewList.reviewer_comment}
            </p>
          </div>

        }else if(ReviewList.reviewer_rating === "2"){
            return <div>
            <p className=" p-0 m-0">
              <span className="Review-Title">{ReviewList.reviewer_name}</span>{" "}
              <span className="text-success">
                <i className="fa fa-star"></i> <i className="fa fa-star"></i>{" "}
              </span>{" "}
            </p>
            <p>
              {ReviewList.reviewer_comment}
            </p>
          </div>

        }else if(ReviewList.reviewer_rating === "3"){
            return <div>
            <p className=" p-0 m-0">
              <span className="Review-Title">{ReviewList.reviewer_name}</span>{" "}
              <span className="text-success">
                <i className="fa fa-star"></i> <i className="fa fa-star"></i>{" "}
                <i className="fa fa-star"></i>
              </span>{" "}
            </p>
            <p>
              {ReviewList.reviewer_comment}
            </p>
          </div>

        }else if(ReviewList.reviewer_rating === "4"){
            return <div>
            <p className=" p-0 m-0">
              <span className="Review-Title">{ReviewList.reviewer_name}</span>{" "}
              <span className="text-success">
                <i className="fa fa-star"></i> <i className="fa fa-star"></i>{" "}
                <i className="fa fa-star"></i> <i className="fa fa-star"></i>{" "}
              </span>{" "}
            </p>
            <p>
              {ReviewList.reviewer_comment}
            </p>
          </div>

        }else if(ReviewList.reviewer_rating === "5"){
            return <div>
            <p className=" p-0 m-0">
              <span className="Review-Title">{ReviewList.reviewer_name}</span>{" "}
              <span className="text-success">
                <i className="fa fa-star"></i> <i className="fa fa-star"></i>{" "}
                <i className="fa fa-star"></i> <i className="fa fa-star"></i>{" "}
                <i className="fa fa-star"></i>{" "}
              </span>{" "}
            </p>
            <p>
              {ReviewList.reviewer_comment}
            </p>
          </div>
            
        }
       
    });
    return (
        <div>
          <h6 className="mt-2">REVIEWS</h6>
          {MyView}
        </div>
      );
  } else {
    return (
    <div>
      <h6 className="mt-2">REVIEWS</h6>
        <p>There have no reviews Yet</p>
    </div>
  );
  }

  
}

export default ReviewList;
