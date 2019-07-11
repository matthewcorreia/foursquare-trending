import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchData, changePage } from '../actions/actions';

class ItemList extends Component {
  componentDidMount() {
    let location = 'nyc'
    this.props.fetchData('items', location);
  }

  render() {
    if (this.props.hasErrored) {
      return <p>There was an error loading the items</p>;
    }

    if (this.props.isLoading) {
      return <p>Loading…</p>;
    }

    if (this.props.items.length < 1) {
      return <p>Nothing is trending :(</p>;
    }

    return (
      <ul id='item-list'>
        {this.props.items.map((item) => (
          <li key={item.id} onClick={() => {
            this.props.fetchData('venue', item.id);
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
  fetchData: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  hasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    items: state.items,
    hasErrored: state.fetchDataHasErrored,
    isLoading: state.fetchDataIsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (type, data) => dispatch(fetchData(type, data)),
    changePage: (page) => dispatch(changePage(page))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
