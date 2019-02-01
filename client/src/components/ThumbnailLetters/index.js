import React from "react";
import classnames from 'classnames'

class ThumbnailLetters extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const {text} = this.props;
        let letters= '';
        if(text.indexOf(' ')>-1)
        {
            text.split(' ').map((word)=>{
                if(word.length>1)
                letters+=word.slice(0,1)
                return;
            })
        }else{
            letters+=text.slice(0,2)
        }
        
        if(letters.length>2){
            letters=letters.slice(0,2)
        }
        return (
            <div  className={`align-self-center list-thumbnail-letters ${this.props.color?'btn-'+this.props.color:''}  ${this.props.className}  ${classnames(
                {"rounded-circle": this.props.rounded,"small": this.props.small}
            )}`}
            title={text}
            >{letters}</div>
        );
    }
}


export default ThumbnailLetters;