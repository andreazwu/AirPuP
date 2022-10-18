import { Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import "./Reviews.css"
import reviewsReducer from "../../store/reviews"

const MyReview = ({review}) => {
  const dispatch = useDispatch()


  return (
    <div className="my-single-review">

      <div className="my-single-header">
        Review For
        <Link to={`/spots/${review.Spot.id}`}>
          {review.Spot.name}
        </Link>
      </div>


      <div className="my-single-stats">

        <div className="rating">
          <i className="fa-solid fa-star"></i>
          <div className="rating-number">
            {review.stars}
          </div>
        </div>

        <p className="single-review-date">
            {new Date(review.createdAt).toString().slice(3,-42)}
        </p>

        <div className="review">
          {review.review}
        </div>

      </div>


      <button
      className="review-buttons"
      // onClick={() => dispatch(thunkRemoveReview(review.id))}
      >
        Delete Review
      </button>


    </div>
  )
}

export default MyReview

  // review prop looks like this:

  // { id, userId, spotId, review, stars,
  //   User: { id, firstName, lastName },
  //   Spot: { id, ownerId, add, city, state, coun,
  //           lat, lng, name, price,
  //           previewImage },
  //   ReviewImages: [ { id, url }, {}, {} ] }
