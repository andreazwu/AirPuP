import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { thunkGetOneSpot, acResetSpots } from "../../store/spots"
import CreateReviewModal from "../Reviews/CreateReviewModal"
import LoadSpotReviews from "../Reviews/LoadSpotReviews"

import noimage from "../../images/noimage.jpg"
import aircover from "../../images/aircover.webp"

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

  useEffect(() => {
    // console.log("5 USE EFFECT DISPATCH THUNK RUNNING")
    dispatch(thunkGetOneSpot(+spotId))
    return () => dispatch(acResetSpots())
  }, [dispatch, spotId])

  // console.log(`3 THIS IS THE SPOTID FROM PARAMS: ${spotId}; CURRENT SPOT RECEIVED FROM USE SELECTOR: ${spot}`)


  //verify if currentUser is owner of spot
  const currentUser = useSelector((state) => state.session.user)
  let owner = false
  if (currentUser?.id === spot.ownerId) owner = true


  // if (!spot) return null
  if (!Object.values(spot).length) return null

  //SpotImages: [{id, url, preview}, {}, {}]
  let displayImages = [...spot.SpotImages]
  let previewImage = displayImages.find((image)=>{
    return image.preview===true
  })
  if (!previewImage) {
    previewImage = displayImages[0]
    displayImages.splice(0,1)
  } else {
    displayImages.splice(displayImages.indexOf(previewImage),1)
  }
  let nonPreviewCount = displayImages.length
  if (nonPreviewCount < 4) {
    for (let i = 3; i >= nonPreviewCount; i--) {
      displayImages[i] = { "url" : noimage }
    }
  }
  // console.log(`THIS IS THE DISPLAY IMAGES ARR: ${displayImages}; THIS IS THE PREVIEW IMAGE: ${previewImage}`)

  return (
    <>
      <div className="one-spot-container">
        {/* {console.log("4 (2.5) RETURN:", spot)} */}

        <div className="one-spot-header">
          <div className="one-spot-header-name">
            <h1>{spot.name}</h1>
          </div>

          <div className="one-spot-header-detail">
            {spot.avgRating ?
              (<span>★ {spot.avgRating}  ·  </span>):
              (<span>★ New  ·  </span>)
            }
            <span>{spot.numReviews}{" "}reviews  ·  </span>
            <span>Superhost  ·  </span>
            <span>
              {spot.city}, {spot.state}, {spot.country}
            </span>
          </div>
        </div>

        <div className="one-spot-images-container">
          <div>
            {
              previewImage &&
              <img className="one-spot-preview-image"
              alt={spot.name} src={previewImage.url}/>
            }
          </div>
          <div className="one-spot-other-images-container">
            {
              displayImages.length ?
              displayImages.map((image) =>
                <img className="one-spot-other-image"
                key={image.id} src={image.url}/>) :
              (<div>listing has no other images</div>)
            }
          </div>
        </div>

        <div className="one-spot-below-pictures">
          <div className="one-spot-below-left">
            <h2>Entire home hosted by {spot.Owner.firstName}</h2>
            <div className="one-spot-linebreak"></div>
            <div>
              <img className="aircover" src={aircover} />
              <p>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</p>
            </div>
            <div className="one-spot-linebreak"></div>
            <div>
              {spot.description}
            </div>
            {/* <div className="one-spot-linebreak"></div> */}
          </div>

          <div className="one-spot-below-right-floating">
            <div className="floating-header">
              <div>
                <span className="one-spot-price">${spot.price}</span> night
              </div>

              <div className="one-spot-floating-review">
                  <span>
                  {spot.avgRating ?
                    (<span className="bold">★ {spot.avgRating}  ·   </span>):
                    (<span className="bold">★ New  ·   </span>)
                  }
                  </span>
                  <span>{spot.numReviews} reviews</span>
              </div>
            </div>
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
        <div className="one-spot-linebreak"></div>

        {/* only show "create review" button to NON-owner of spot */}
        <div>
          {
            currentUser &&
            !owner &&
            <CreateReviewModal spotId={spotId}/>
          }
        </div>

        <LoadSpotReviews spotId={spotId} />
      </div>


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
