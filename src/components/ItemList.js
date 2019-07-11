import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { itemsFetchData } from '../actions/items';
import { clientId, clientSecret, near } from '../secrets'

class ItemList extends Component {
  componentDidMount() {
    this.props.fetchData(
      `https://api.foursquare.com/v2/venues/trending?client_id=${clientId}&client_secret=${clientSecret}&v=20190701&near=${near || 'nyc'}`
    );
  }

  render() {
    if (this.props.hasErrored) {
      return <p>There was an error loading the items.</p>;
    }

    if (this.props.isLoading) {
      return <p>Loading…</p>;
    }

    return (
      <ul style={{
        maxWidth: '20em',
        listStyleType: 'none'
      }}>
        {this.props.items.map((item) => (
          <li key={item.id}>
            <div>
              <strong style={{ paddingRight: '.5em' }}>
                <a href='' title={item.venuePage && item.venuePage.id}>
                  {item.name}
                </a>
              </strong>
              {item.categories.map(category => {
                return <img
                  key={category.id}
                  style={{
                    width: '1.5em',
                    height: '1.5em',
                    marginLeft: '.5em',
                    float: 'right',
                    backgroundColor:'black',
                    borderRadius:'50%'
                  }}
                  src={category.icon.prefix + '32' + category.icon.suffix}
                  title={category.name} />
              })}
            </div>
            <div style={{ paddingTop: '.25em' }}>
              <small><em>
                {item.location.formattedAddress[0]}
              </em></small>
            </div>
            <hr/>
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
    hasErrored: state.itemsHasErrored,
    isLoading: state.itemsIsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(itemsFetchData(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
