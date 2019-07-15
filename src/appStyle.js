import styled, { css } from 'styled-components';

const componentStyle = css`

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}

select {
  display: block;
  border: 1px solid black;
  -webkit-appearance: none; 
  -moz-appearance: none;
}

.select-wrapper {
  display: flex;
  justify-content: flex-end
}
.select {
  display: block;
  width: 200px;
  text-align: right;
}

.reviewCard {
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid black;

  &:last-child {
    border-bottom: 0;
  }
}

.reviewCard-user {
  display: flex
}

.reviewCard-content {
  display: block
}

.shopReview {
  display: inline-flex;
  align-items: center;
  align-content: center;
  
  border: 1px solid black;
  border-radius: 20px;
  margin-left: 10px;
  padding: 2px;
}

.shopReview-total {
  margin-right: 5px;
}

.shopReview-reviews {
  text-align: center
}

.reviewTotal-card-titile {
  display: flex;
  align-items: center;
  text-transform: uppercase
}

.shopReview-total .StarRatingComponent-wrapper{
  margin: 0;
}

.review-small {
  margin-top: 15px;
  font-size: 12px;
  font-weight: 100;
}

.login-page {
  margin: 50px auto;
  padding: 10px;
}

.simplemap {
  position: relative;
}

.materialize-textarea {
  height: 6rem
}

label {
  font-size: 1rem;
  color: black
}
`

export default componentStyle