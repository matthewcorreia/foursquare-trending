import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { changePage } from '../actions/common';
import { fetchItems } from '../actions/items';
import { fetchVenue } from '../actions/venue';


class ItemList extends Component {
  componentDidMount() {
    let location = 'nyc'
    this.props.fetchItems(location);
  }

  render() {
    if (this.props.hasErrored) {
      return <p className='status'>There was an error loading the items</p>;
    }

    if (this.props.isLoading) {
      return <p className='status'>Loading…</p>
    } else if (this.props.items.length < 1) {
      return <p className='status'>Nothing is trending</p>
    }

    return (
      <ul id='item-list'>
        {this.props.items.map((item) => (
          <li key={item.id} onClick={() => {
            this.props.fetchVenue(item.id);
            this.props.changePage('two');
          }}>
            <div className='col-main'>
              <div className='venue-title' title={item.venuePage && item.venuePage.id}>
                {item.name}
              </div>
              <div className='venue-address'>
                {item.location.formattedAddress[0]}
              </div>

            </div>
            <div className='col-icon'>
              {item.categories.map(category => {
                return <img
                  key={category.id}
                  className='category-icon'
                  src={category.icon.prefix + '32' + category.icon.suffix}
                  title={category.name} />
              })}
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

ItemList.propTypes = {
  fetchItems: PropTypes.func.isRequired,
  fetchVenue: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  hasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    items: state.items,
    hasErrored: state.fetchItemsHasErrored,
    isLoading: state.fetchItemsIsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchItems: (loc) => dispatch(fetchItems(loc)),
    fetchVenue: (id) => dispatch(fetchVenue(id)),
    changePage: (page) => dispatch(changePage(page))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
