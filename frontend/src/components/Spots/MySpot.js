import { Link, useHistory } from "react-router-dom"
import "./Spots.css"
import { useDispatch, useSelector } from "react-redux"
import { thunkRemoveSpot } from "../../store/spots"

const MySpot = ({spot}) => {
  const dispatch = useDispatch()
  const history = useHistory()

  //verify if currentUser is owner of spot
  const currentUser = useSelector((state) => state.session.user)
  let owner = false
  if (currentUser?.id === spot.ownerId) owner = true

  //handle delete spot click
  const deleteSpotHandleClick = async () => {
    await dispatch(thunkRemoveSpot(spot.id))
  }

  return (
    <div>
      <Link to={`/spots/${spot.id}`}>

        <div className="allspots-spot-image-container">
          {spot.previewImage ?
            (<div><img src={spot.previewImage} /></div>) :
            (<div><img src="https://bitsofco.de/content/images/2018/12/broken-1.png" alt="spot has no preview image" /></div>)
          }
        </div>

        <div>
          {spot.city}, {spot.state}
        </div>

        <div>
          {spot.avgRating ?
            (<span>★{spot.avgRating}</span>):
            (<span>no rating</span>)
          }
        </div>

        <div>
          $<span>{spot.price}</span> night
        </div>


      </Link>


        {/* only show edit/delete buttons to owner of spot */}
        <div>
          {owner && (
            <>
              <button onClick={() => history.push(`/edit/${spot.id}`)}>
                Edit
              </button>
              <button onClick={deleteSpotHandleClick}>
                Delete
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
