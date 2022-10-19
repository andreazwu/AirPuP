import { Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { thunkRemoveReview } from "../../store/reviews"
import "./Reviews.css"

const MyReview = ({review}) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const deleteReviewHandleClick = async () => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      await dispatch(thunkRemoveReview(review.id))
    }
  }

  const editReviewHandleClick = async () => {
    history.push(`/myreviews/edit/${review.id}`)
  }

  return (
    <div className="my-single-wrapper">

      <div className="my-single-header">
        Review For {" "}
        <Link to={`/spots/${review.Spot.id}`}>
          {review.Spot.name}
        </Link>
      </div>


      <div className="my-single-stats">

        <div className="my-single-rating">
          <i className="fa-solid fa-star"></i>
          <span className="my-single-rating-number">
            {" "}{review.stars}
          </span>
        </div>

        <p className="single-review-date">
            {new Date(review.createdAt).toString().slice(3,-42)}
        </p>

        <div className="my-single-review">
          "{review.review}"
        </div>

      </div>


      <div>
        <button onClick={editReviewHandleClick}>
          Edit Review
        </button>
        <button onClick={deleteReviewHandleClick}>
          Delete Review
        </button>
      </div>

      <div>
        {
          review.ReviewImages.length > 0 &&
          <div>
            <p>Review Images For This Spot:</p>
            <div>
              {review.ReviewImages.map((ele) => {
                return (
                  <div className="my-single-image-wrapper">
                    <img src={ele.url} className="my-single-image" />
                  </div>
                )
              })}
            </div>
          </div>
        }
      </div>

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
