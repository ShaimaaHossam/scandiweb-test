import React from "react";
import "../css/Category.css";
import { gql } from "apollo-boost";
import {graphql} from 'react-apollo';
import {connect} from 'react-redux';
import {addToCart} from '../../redux/Shopping/cart-actions';
const getProducts = gql`
  query GetProducts {
    category {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency
          amount
        }
      }
    }
  }
`;
 class Category extends React.Component {
   
   
  redirectToProduct(product){
    window.location.href="/"+product;
  }
  handleAddItem = (product) => {
    console.log(product);
    const { dispatch } = this.props;                
    dispatch(
      addToCart({productID: product.id, attributename: null, value: null})
    )
  }
  render() {
    console.log(this.props);
    var data = this.props.data;    
    if(data.loading){
      return (<p>Loading ...</p>);
    }  
    else{ 
      return (
      
      <div className={this.props.background + " container"}>
        <p className="title">All categories</p>
            <section className="cards-container">
              
              {data.category.products.map((product) => (
                product.inStock ? 
                <article key={product.id} className="card">
                  <img onClick={()=>this.redirectToProduct(product.id)} width="250" height="250" src={product.gallery[0]} alt="img" />
                  <svg onClick={()=>this.handleAddItem(product)}
                    className="rounded-button navlink"
                    fill="#ffffff"
                    height="20px"
                    viewBox="0 -31 512.00026 512"
                    width="20px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m164.960938 300.003906h.023437c.019531 0 .039063-.003906.058594-.003906h271.957031c6.695312 0 12.582031-4.441406 14.421875-10.878906l60-210c1.292969-4.527344.386719-9.394532-2.445313-13.152344-2.835937-3.757812-7.269531-5.96875-11.976562-5.96875h-366.632812l-10.722657-48.253906c-1.527343-6.863282-7.613281-11.746094-14.644531-11.746094h-90c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15h77.96875c1.898438 8.550781 51.3125 230.917969 54.15625 243.710938-15.941406 6.929687-27.125 22.824218-27.125 41.289062 0 24.8125 20.1875 45 45 45h272c8.285156 0 15-6.714844 15-15s-6.714844-15-15-15h-272c-8.269531 0-15-6.730469-15-15 0-8.257812 6.707031-14.976562 14.960938-14.996094zm312.152343-210.003906-51.429687 180h-248.652344l-40-180zm0 0" />
                    <path d="m150 405c0 24.8125 20.1875 45 45 45s45-20.1875 45-45-20.1875-45-45-45-45 20.1875-45 45zm45-15c8.269531 0 15 6.730469 15 15s-6.730469 15-15 15-15-6.730469-15-15 6.730469-15 15-15zm0 0" />
                    <path d="m362 405c0 24.8125 20.1875 45 45 45s45-20.1875 45-45-20.1875-45-45-45-45 20.1875-45 45zm45-15c8.269531 0 15 6.730469 15 15s-6.730469 15-15 15-15-6.730469-15-15 6.730469-15 15-15zm0 0" />
                  </svg>
                  <p onClick={()=>this.redirectToProduct(product.id)} className="details">{product.name}</p>
                  <p onClick={()=>this.redirectToProduct(product.id)} className="details">{
                                            this.props.currency===0 ? '$'+product.prices[0].amount :
                                            this.props.currency===1 ? '£'+product.prices[1].amount :
                                            this.props.currency===2 ? 'AUD'+product.prices[2].amount :
                                            this.props.currency===3 ? '¥'+product.prices[3].amount :
                                            this.props.currency===4 ? '₽'+product.prices[4].amount : ''}</p>
                {product.attributes.map((attr,index)=>(
                  <div className="flex plp">
                  {attr.items.map((item,index)=>(
                    item.displayValue==="Blue" ? 
                    <div className="item swatch blue"></div> :
                    item.displayValue==="Green" ? 
                    <div className="item swatch green"></div> :
                    item.displayValue==="White" ? 
                    <div className="item swatch white"></div> :
                    item.displayValue==="Cyan" ? 
                    <div className="item swatch cyan"></div> :
                    item.displayValue==="Black" ? 
                    <div className="item swatch black"></div> :
                    ''
                  ))}
                </div>
                ))}
                
                </article> 
                
                
                : 

                <article key={product.id} className="cardOutOfStock">
                <img width="250" height="250" src={product.gallery[0]} alt="img" />
                <p className="out">OUT OF STOCK</p>
                <p className="details">{product.name}</p>
                <p className="details">{
                                          this.props.currency===0 ? '$'+product.prices[0].amount :
                                          this.props.currency===1 ? '£'+product.prices[1].amount :
                                          this.props.currency===2 ? 'AUD'+product.prices[2].amount :
                                          this.props.currency===3 ? '¥'+product.prices[3].amount :
                                          this.props.currency===4 ? '₽'+product.prices[4].amount : ''}</p>
                {product.attributes.map((attr,index)=>(
                  <div className="flex plp">
                  {attr.items.map((item,index)=>(
                    item.displayValue==="Blue" ? 
                    <div className="item swatch blue"></div> :
                    item.displayValue==="Green" ? 
                    <div className="item swatch green"></div> :
                    item.displayValue==="White" ? 
                    <div className="item swatch white"></div> :
                    item.displayValue==="Cyan" ? 
                    <div className="item swatch cyan"></div> :
                    item.displayValue==="Black" ? 
                    <div className="item swatch black"></div> :
                    ''
                  ))}
                </div>
                ))}
                </article>


              ))}
            </section>
          
      </div>
    );
    }
  }
}
export default connect(

  )(graphql(getProducts)(Category));
  