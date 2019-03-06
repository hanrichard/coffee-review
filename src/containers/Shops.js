import React, {Component} from 'react';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'
import ShopList from '../components/shops/ShopList';
import MainMapList from '../components/maps/MainMapList';
import {clickshop} from '../store/actions/shopsActions'

class Shops extends Component {

    render() {
        const showshoplist = () => {
            return (
                <ShopList 
                    suburb={this.props.match.params.suburb}
                    shops={shops} 
                    reviews={reviews}/>
            )
        }

        const {shops, reviews, auth, notifications } = this.props;
        // if(!auth.uid) return <Redirect to='/signin' /> console.log(this.props.shops)
        console.log(reviews)
        console.log(this.props.match.params.suburb)
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m3">
                        
                        { showshoplist() }

                    </div>
                    <div className="col s12 m9">
                        <MainMapList />
                        {/* <Notification notifications={notifications}/> */}
                    </div>
                </div>
            </div>
        )
    }
}


export default compose(firestoreConnect((props) => [
    {collection: 'shops',
        where: [
            ['suburb', '==', props.match.params.suburb.replace("-", " ")]
        ],
    
    },
    {collection: 'reviews',
        where: [
            ['suburb', '==', props.match.params.suburb.replace("-", " ")]
        ]
    }
]), connect((state) => ({
    shops: state.firestore.ordered.shops,
    reviews: state.firestore.ordered.reviews,
  })
    
))(Shops)
