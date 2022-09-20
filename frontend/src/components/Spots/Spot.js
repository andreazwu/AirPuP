import { Link } from "react-router-dom"
import "./Spot.css"

const Spot = ({spot}) => {
  return (
    <div>
      <Link to={`/spots/${spot.id}`}>

        {spot.previewImage ?
          (<div><img src={spot.previewImage} /></div>) :
          (<div><img src="" alt="spot has no preview image" /></div>)
        }

        <div>
          {spot.city}, {spot.state}
        </div>

        <div>
          {spot.avgRating ?
            (<span>{spot.avgRating}</span>):
            (<span>no rating</span>)
          }
        </div>

        <div>
          $<span>{spot.price}</span> night
        </div>


      </Link>
    </div>
  )
}

export default Spot

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
