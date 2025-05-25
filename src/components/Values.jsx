import './Values.css'
import locationImg from '../assets/location.webp'
import lifestyleImg from '../assets/lifestyle.webp'

const Values = () => (
  <section className="values-section">
    {/* Location block */}
    <div className="values-section__block location-block">
      <img
        src={locationImg}
        alt="Maryborough neighborhood"
        className="values-section__image"
      />
      <div className="values-section__text">
        <h4 className="values-section__label">LOCATION</h4>
        <h2 className="values-section__heading">Peaceful yet connected.</h2>
        <p className="values-section__body">
          Edenvale is tucked away in a leafy corner of Maryborough, with local shops,
          cafes and public transport just an easy stroll from your doorstep.
        </p>
        <a href="#" className="values-section__button">Explore the Neighbourhood</a>
      </div>
    </div>

    {/* Lifestyle block */}
    <div className="values-section__block lifestyle-block">
      <img
        src={lifestyleImg}
        alt="Modern parkside living"
        className="values-section__image"
      />
      <div className="values-section__text">
        <h4 className="values-section__label">LIFESTYLE</h4>
        <h2 className="values-section__heading">Modern parkside living.</h2>
        <p className="values-section__body">
          The Maryborough Park System is steps away, perfect for running, biking, or
          just enjoying the natural beauty of the area.
        </p>
        <a href="#" className="values-section__button">Explore the Experience</a>
      </div>
    </div>
  </section>
)

export default Values