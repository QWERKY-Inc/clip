import fetch from 'node-fetch';
import React,{useEffect} from 'react';
import {TouchableOpacity,Text,View,Modal,Image,TouchableHighlight,Linking,Dimensions} from 'react-native';
import xIcon from '../assets/x.png'
const queryString = require('query-string');

function Pagination(props) {
    const[currentPage,setCurrentPage]=React.useState(1)
    const[endPage,setEndPage]=React.useState(0)
    const[pageNeighbours,setPageNeighbours]=React.useState(2)
    const[betweenPages,setBetweenPages]=React.useState([])
    // useEffect(() => {
    // },[])
    useEffect(() => {
        setCurrentPage(props.currentPage)
        setEndPage(props.endPage)
        var array=[]
        for(var i= props.currentPage-2;i<props.currentPage+3;i++){
            array.push(i)
        }
        if(array.indexOf(1)!=-1){
            for(var i=0;i<array.indexOf(1)+1;i++){
                array.push(array[array.length-1]+1)
            }
            array=array.splice(array.indexOf(1)+1)
        }
        if(array.indexOf(props.endPage)!=-1){
            for(var i=0;i<array.length-array.indexOf(props.endPage);i++){
                if(array[0]-1>1){
                    array.unshift(array[0]-1)
                } 
            }
            array.splice(array.indexOf(props.endPage))
        }
        setBetweenPages(array.slice())


    },[props.currentPage,props.endPage])
    // useEffect(()=>{
        
    // },[props.endPage])
    const handleMoveLeft = function(){
        setCurrentPage(currentPage-(pageNeighbours*2-1))
    }
    const handleMoveRight = function(){
        setCurrentPage(currentPage+(pageNeighbours*2-1))
    }
    if(endPage!=1){
        return(
            <div
                style={{
                    position:'relative',
                    display:'flex',
                    flexDirection:'row',
                    backgroundColor:'transparent',
                    padding:'15px'
                }}
            >
                <TouchableOpacity
                onPress={()=>{
                    props.currentPageTo(1)
                }}
                style={{
                    backgroundColor:1==currentPage?'rgb(255,123,88)':'transparent',
                    border:'1px solid rgb(255,123,88)',
                    width:'30px',
                    height:'30px',
                    justifyContent:'center',
                    alignItems:'center',
                    textAlign:'center',
                    padding:'auto'
                }}
                
                >
                    <Text
                        
                    >
                        1
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        backgroundColor:'transparent',
                        border:'1px solid rgb(255,123,88)',
                        width:'30px',
                        height:'30px',
                        justifyContent:'center',
                        alignItems:'center',
                        textAlign:'center',

                    }}
                    onPress={()=>{
                    props.leftPageJump()
                }}>
                    <Text>
                        &lt;
                    </Text>
                </TouchableOpacity>

                {betweenPages.map((pageNumber,index)=>
                    <TouchableOpacity
                    onPress={()=>{
                        props.currentPageTo(pageNumber)
                        }}
                        style={{
                        backgroundColor:pageNumber==currentPage?'rgb(255,123,88)':'transparent',
                        border:'1px solid rgb(255,123,88)',
                        width:'30px',
                        height:'30px',
                        justifyContent:'center',
                        alignItems:'center',
                        textAlign:'center',
                        padding:'auto'
                    }}
                        
                        >
                        <Text>
                            {pageNumber}
                        </Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity
                    style={{
                        backgroundColor:'transparent',
                        border:'1px solid rgb(255,123,88)',
                        width:'30px',
                        height:'30px',
                        justifyContent:'center',
                        alignItems:'center',
                        textAlign:'center',

                    }}
                    onPress={()=>{
                        props.rightPageJump()
                    }}>
                    <Text>
                        &gt;
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        backgroundColor:endPage==currentPage?'rgb(255,123,88)':'transparent',
                        border:'1px solid rgb(255,123,88)',
                        width:'30px',
                        height:'30px',
                        justifyContent:'center',
                        alignItems:'center',
                        textAlign:'center',

                    }}
                    onPress={()=>{
                    props.currentPageTo(endPage)
                }}
                >
                    <Text>
                        {endPage}
                    </Text>
                </TouchableOpacity>
            </div>

        )
    }
    else{
        return(
            <Text>
                1
            </Text>
        )
        
    }
}
export default Pagination;