import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { thunkGetOneSpot, thunkRemoveSpot } from "../../store/spots"
import "./LoadOneSpot.css"

const LoadOneSpot = () => {
  console.log("1 COMPONENT-LOADONESPOT RUNNING")
  const dispatch = useDispatch()
  const history = useHistory()
  const { spotId } = useParams()

  const spot = useSelector((state)=>{
    console.log("2 USE SELECTOR RUNNING")
    return state.spots.singleSpot
  }) // single obj {x}

  //dispatch THUNK AC
  useEffect(() => {
    console.log("5 USE EFFECT DISPATCH THUNK RUNNING")
    dispatch(thunkGetOneSpot(+spotId)) //<<<< spotId =__=|||
  }, [dispatch, spotId])

  console.log(`3 THIS IS THE SPOTID FROM PARAMS: ${spotId}; CURRENT SPOT RECEIVED FROM USE SELECTOR: ${spot}`)


  //verify if currentUser is owner of spot
  const currentUser = useSelector((state) => state.session.user)
  let owner = false
  if (currentUser.id === spot.ownerId) owner = true

  //handle delete spot click
  const deleteSpotHandleClick = async () => {
    await dispatch(thunkRemoveSpot(spot.id))
    history.push("/")
  }


  //conditional rendering:
  // if (!spot) return null
  if (!Object.values(spot).length) return null



  //organize images (AFTER conditional rendering)
  //SpotImages: [{id, url, preview}]
  let displayImages = [...spot.SpotImages]
  let previewImage = displayImages.find((image)=>{
    return image.preview===true
  })
  if (!previewImage) previewImage = displayImages[0]
  else displayImages.splice(displayImages.indexOf(previewImage),1)

  console.log(`THIS IS THE DISPLAY IMAGES ARR: ${displayImages}; THIS IS THE PREVIEW IMAGE: ${previewImage}`)



  return (
    <>
      <div className="whole-container">
        Heyaa this is spot # {spotId}
        {console.log("4 (2.5) RETURN:", spot)}

        <div className="title-whole">
          <div>
            <h2>{spot.name}</h2>
          </div>

          <div className="title-detail">
            {spot.avgRating ?
              (<span>★{spot.avgRating}  ·  </span>):
              (<span>no rating  ·  </span>)
            }

            {/* {console.log("RETURN NUM REVIEWS:", spot.numReviews)} */}
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
        <div>
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
        </div>


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
