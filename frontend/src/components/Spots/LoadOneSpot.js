import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { thunkGetSpotReviews } from "../../store/reviews"
import { thunkGetOneSpot, acResetSpots } from "../../store/spots"
import CreateReviewModal from "../Reviews/CreateReviewModal"
import LoadSpotReviews from "../Reviews/LoadSpotReviews"
import "./Spots.css"

const LoadOneSpot = () => {
  // console.log("1 COMPONENT-LOADONESPOT RUNNING")
  const dispatch = useDispatch()
  const history = useHistory()
  const { spotId } = useParams()

  const spot = useSelector((state)=>{
    // console.log("2 USE SELECTOR RUNNING")
    return state.spots.singleSpot
  }) // single obj {x}

  useEffect(async () => {
    // console.log("5 USE EFFECT DISPATCH THUNK RUNNING")
    const getSpotAndReviews = async () => {
      const spotExists = await dispatch(thunkGetOneSpot(spotId))
      if (spotExists) {
        dispatch(thunkGetSpotReviews(spotId))
      }
    }
    getSpotAndReviews()
    return () => dispatch(acResetSpots())
  }, [dispatch, spotId])

  // console.log(`3 THIS IS THE SPOTID FROM PARAMS: ${spotId}; CURRENT SPOT RECEIVED FROM USE SELECTOR: ${spot}`)


  //verify if currentUser is owner of spot
  const currentUser = useSelector((state) => state.session.user)
  let owner = false
  if (currentUser?.id === spot.ownerId) owner = true


  //verify if currentUser has left a review already
  const reviewsObj = useSelector((state) => state.reviews.spot)
  const reviewArr = Object.values(reviewsObj)
  let userHasReviewed = false
  if (currentUser) {
    const userReviews = reviewArr.filter((review) => review.userId === currentUser.id)
    userHasReviewed = !!userReviews.length
  }

  // if (!spot) return null
  if (!Object.values(spot).length) return null

  //SpotImages: [{id, url, preview}]
  let displayImages = [...spot.SpotImages]
  let previewImage = displayImages.find((image)=>{
    return image.preview===true
  })
  if (!previewImage) previewImage = displayImages[0]
  else displayImages.splice(displayImages.indexOf(previewImage),1)

  // console.log(`THIS IS THE DISPLAY IMAGES ARR: ${displayImages}; THIS IS THE PREVIEW IMAGE: ${previewImage}`)

  return (
    <>
      <div className="whole-container">
        {/* {console.log("4 (2.5) RETURN:", spot)} */}

        <div className="title-whole">
          <div>
            <h2>{spot.name}</h2>
          </div>

          <div className="title-detail">
            {spot.avgRating ?
              (<span>★{spot.avgRating}  ·  </span>):
              (<span>no rating  ·  </span>)
            }

            {/* {console.log("add review link here <<<<<")} */}
            <span>{spot.numReviews} reviews  ·  </span>

            <span>
              {spot.city}, {spot.state}, {spot.country}
            </span>
          </div>
        </div>

        <div className="pictures-container">
          <div className="preview-image">
            {previewImage ?
              (<img src={previewImage.url}/>) :
              (<div>listing has no images</div>)
            }
          </div>
          <div className="display-image">
            {displayImages.length ?
              displayImages.map((image)=><img key={image.id} src={image.url}/>) :
              // (<div></div>)
              (<div>listing has no other images</div>)
           }
          </div>
        </div>

        <div className="below-pictures">
          <div>
            Hosted by: {spot.Owner.firstName}
          </div>
          <div>
            {spot.description}
          </div>
          <div>
            ${spot.price}
          </div>
        </div>


        {/* only show edit/delete buttons to owner of spot */}
        {/* <div>
          {owner && (
            <>
              <button onClick={() => history.push(`/edit/${spot.id}`)}>
                Edit Spot
              </button>
              <button onClick={deleteSpotHandleClick}>
                Delete Spot
              </button>
            </>
          )}
        </div> */}
      </div>
        {/* only show "create review" button to NON-owner of spot */}
        <div>
          {
            currentUser &&
            !owner &&
            !userHasReviewed &&
            <CreateReviewModal spotId={spotId}/>
          }
        </div>

      <LoadSpotReviews spotId={spotId} />
    </>
  )
}

export default LoadOneSpot

/*
singleSpot: {
  id,ownerId,address,city,state,country,lat,lng,
  name,description,price,
  numReviews,
  avgRating,
  SpotImages: [
     {
        id,
        url,
        preview
     }
  ],
  Owner: {
     id,
     firstName,
     lastName
  }
}
*/
