import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchData, changePage } from '../actions/actions';

class VenueDetails extends Component {
  render() {
    if (this.props.hasErrored) {
      return <p>There was an error loading the venue</p>;
    }

    if (this.props.isLoading) {
      return <p>Loading…</p>;
    }

    const venue = !!this.props.venue.name && this.props.venue || !!this.props.venue.id && {
      name: 'Fail Venue',
      bestPhoto: {
        prefix: 'https://fastly.4sqi.net/img/general/',
        width: '612',
        suffix: '/1112348_XN9BG-MFXC20fhjZAXNtGeEd8kzgFOWQ7n8Q7LsKEvE.jpg'
      },
      shortUrl: '#shortUrl',
      url: '#url',
      rating: '0.0',
      ratingColor: 'ff0000',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }

    return (
      <div>
        {venue.name && <div>
          <div className='back-link'>
            <a href='javascript:void(0)' onClick={() => {
              this.props.changePage('one');
            }}>Back to list</a>
          </div>
          <img className='venue-image'
            src={venue.bestPhoto.prefix + venue.bestPhoto.width + venue.bestPhoto.suffix}
          />
          <div className='venue-data top'>
            <div className='venue-title' title={venue.shortUrl}>
              {venue.name}
              <div className='venue-rating' style={{backgroundColor: '#' + venue.ratingColor}}>
                {venue.rating}
              </div>
            </div>
          </div>
          <div className='venue-data bottom'>
            <p>{venue.description}</p>
            <p><a href={venue.url}>{venue.url}</a></p>
          </div>
        </div>}
      </div>
    );
  }
}

VenueDetails.propTypes = {
  fetchData: PropTypes.func.isRequired,
  venue: PropTypes.object.isRequired,
  hasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    venue: state.venue,
    hasErrored: state.fetchDataHasErrored,
    isLoading: state.fetchDataIsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (type, venueId) => dispatch(fetchData(type, venueId)),
    changePage: (page) => dispatch(changePage(page))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VenueDetails);
