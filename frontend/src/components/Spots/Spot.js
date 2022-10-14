import { Link } from "react-router-dom"
import "./Spots.css"

const Spot = ({spot}) => {
  return (
    <div>
      <Link to={`/spots/${spot.id}`}>

        <div className="allspots-spot-image-container">
        {spot.previewImage ?
          (<div><img src={spot.previewImage} /></div>) :
          (<div><img src="../images/no-image.png" alt="spot has no preview image" /></div>)
        }
        </div>

        <div className="allspots-spot-info">
          <div className="allspots-spot-location">
            {spot.city}, {spot.state}
          </div>

          <div className="allspots-spot-rating">
            {spot.avgRating ?
              (<span>★{spot.avgRating}</span>):
              (<span>no rating</span>)
            }
          </div>

          <div className="allspots-spot-price">
            $<span>{spot.price}</span> night
          </div>
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
