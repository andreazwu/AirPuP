import { Link } from "react-router-dom"
import "./Spots.css"
import noimage from "../../images/noimage.jpg"

const Spot = ({spot}) => {
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

          <div className="allspots-spot-price">
            ${spot.price} <span>night</span>
          </div>
        </div>

      </Link>
    </div>
  )
}

export default Spot
