import { Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { thunkEditSpot, thunkRemoveSpot, thunkGetOneSpot } from "../../store/spots"
import noimage from "../../images/noimage.jpg"

import "./Spots.css"

const MySpot = ({spot}) => {
  const dispatch = useDispatch()
  const history = useHistory()

  //verify if currentUser is owner of spot
  const currentUser = useSelector((state) => state.session.user)
  let owner = false
  if (currentUser?.id === spot.ownerId) owner = true

  //handle delete spot click
  const deleteSpotHandleClick = async () => {
    if (window.confirm("Are you sure you want to delete this spot?")) {
      await dispatch(thunkRemoveSpot(spot.id))
    }
  }

  const editSpotHandleClick = async () => {
    history.push(`/myspots/edit/${spot.id}`)
    // await dispatch(thunkEditSpot(spot.id))
  }

  // const spotToEdit = async () => {
  //   await dispatch(thunkGetOneSpot(spot.id))
  // }

  return (
    <div>
      <Link style={{ textDecoration: "none", color: "black" }} to={`/spots/${spot.id}`}>

      <div className="allspots-spot-image-container">
        {spot.previewImage ?
          (<div><img src={spot.previewImage} /></div>) :
          (<div><img src={noimage} alt="noimage" /></div>)
        }
        </div>

        <div className="allspots-spot-info">

          <div className="allspots-spot-header">
            <div className="allspots-spot-location">
              {spot.city}, {spot.state}
            </div>

            <div className="allspots-spot-rating">
              {spot.avgRating ?
                (<span>★ {spot.avgRating}</span>):
                (<span>★ New</span>)
              }
            </div>
          </div>
          <div className="allspots-spot-country">
            {spot.country}
          </div>
          <div className="allspots-spot-price">
            ${spot.price} <span>night</span>
          </div>
        </div>


      </Link>


        {/* only show edit/delete buttons to owner of spot */}
        <div className="myspot-buttons-container">
          {owner && (
            <>
              <button
              className="myspot-buttons"
              onClick={editSpotHandleClick}>
                Edit Spot
              </button>
              <button
              className="myspot-buttons"
              onClick={deleteSpotHandleClick}>
                Delete Spot
              </button>
            </>
          )}
        </div>






    </div>
  )
}

export default MySpot

/*
    allSpots: {
      [spotId]: {
         id,
         ownerId,
         address,
         city,
         state,
         country
         lat,
         lng,
         name,
         description,
         price,
         avgRating,
         previewImage
      },
      optionalOrderedList: []
    }
 */
