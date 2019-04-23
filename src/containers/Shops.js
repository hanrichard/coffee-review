import React, {Component} from 'react';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';
import ShopList from '../components/shops/ShopList';
import MainMapList from '../components/maps/MainMapList';
import {clickshop} from '../store/actions/shopsActions';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

        const Wrapper = styled.div`
            .dashboard-list {
                padding: 10px 20px;

                @media only screen and (min-width: 600px) {
                    overflow: auto;
                    height: calc(100vh - 64px);
                }
            }
            .dashboard-map {
                @media only screen and (min-width: 600px) {
                    height: 100vh
                    margin-right: -24px;
                }
            }
            .dashboard-nearme {
                margin-bottom: 30px;
                border-bottom: 1px solid #6e6e6e;
                padding-bottom: 30px;
            }
            .dashboard {
                @media only screen and (min-width: 600px) {
                    overflow: hidden;
                    height: calc(100vh - 64px);
                }
            }
        `          
       
        // if(!auth.uid) return <Redirect to='/signin' /> console.log(this.props.shops)

        return (
            <Wrapper>
                <div className="dashboard">
                    <div className="row">

                        <div className="col s12 l9 push-l3 ">
                            <div className="dashboard-map">
                                <MainMapList shops={shops}/>
                            </div>
                        </div>


                        <div className="col s12 l3 pull-l9">
                            <div className="dashboard-list">
                                <div className="dashboard-nearme">
                                    <Link to="/north-sydney">
                                        <span>North sydney coffee</span>
                                    </Link>
                                </div>
                                { showshoplist() }
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
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
