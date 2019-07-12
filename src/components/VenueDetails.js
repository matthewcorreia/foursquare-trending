import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { changePage } from '../actions/common';

class VenueDetails extends Component {
  render() {
    if (this.props.hasErrored) {
      return <p className='status'>There was an error loading the venue</p>
    }

    if (this.props.isLoading) {
      return <p className='status'>Loading…</p>
    }

    let venue = this.props.venue;

    return (
      <div id='venue-details'>
        {venue.name && <div>
          <div className='back-link'>
            <a href='javascript:void(0)' onClick={() => this.props.changePage('one')}>
              Back to list
            </a>
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
  venue: PropTypes.object.isRequired,
  hasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    venue: state.venue,
    hasErrored: state.fetchVenueHasErrored,
    isLoading: state.fetchVenueIsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePage: (page) => dispatch(changePage(page))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VenueDetails);
