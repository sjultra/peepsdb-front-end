import React, {useEffect, useRef, useState} from 'react';
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";
import { Box, Flex, } from '@chakra-ui/react';
import ReactSelect from 'react-select';



const MongoChart = ({profiles}) => {
  const sdk = new ChartsEmbedSDK({baseUrl: process.env['REACT_APP_MONGO_CHARTS']});
  const chartDiv = useRef(null);
  const [rendered, setRendered] = useState(false);


  const [filter,setFilter] = useState({})

  const [chartFilterFields,setChartFilterFields] = useState({
    User:[],
    Country:[]
  })

  const [chart] = useState(sdk.createChart(
    {
        height: '500px', width: '100%', 
        theme: "light",
        chartId:process.env['REACT_APP_MONGO_CHART_ID']    
  }));

  useEffect(() => {
    chart.render(chartDiv.current).then(() => setRendered(true)).catch(err => console.log("Error during Charts rendering.", err));
  }, [chart]);

  useEffect(() => {

    if (rendered) {
      (!chartFilterFields.User?.length ) && chart.getData()
      .then(async(data)=>{
        let User = [];
        let Country = [];

        console.log('data fetched',data)
        await data?.documents?.forEach(entry=>{
          User.push(entry?.color);
          Country?.push(entry?.detail);
        })

        setChartFilterFields({ 
          User: Array.from( new Set(User)),
          Country:Array.from(new Set(Country)) })


      })
      .catch(err=>{
        console.log('fetching chart data removed',err);
      })
      chart.setFilter(filter).catch(err => console.log("Error while filtering.", err));
    }
  }, [chart, filter, rendered]);


  const filterParams = {
    'User':{
      list:chartFilterFields?.User.map(entry=>({
        label:entry?.split('(')[0],
        value:entry?.split(/[()]/)[1]
      })),
      onChangeFn:(e)=>{
        if(!e) {
          setFilter(prev=>{
            
            const {user,...rest} = prev

            return rest;
          })
          return
        };
        // console.log('event target',e)
        let {value} = e;
        setFilter( prev=>{ 

          let initVal = prev;
      

          return {...initVal,   'user':{$oid:value}} 

        })
      }
    },
    'Country':{
      list:chartFilterFields.Country.map(entry=>({
        label:entry,
        value:entry,
      })),
      onChangeFn:(e)=>{
        if(!e) {
          setFilter(prev=>{
            const {user} = prev

            return  user?{user}: {};

          })
          return
        };
        console.log('event target',e)
        let {value} = e;
        setFilter(prev=>{ 
          let initVal  = prev || {}
          return value?{...initVal,'userInsights.country':value}:{...initVal } 
        })
      }
    }
  }

  const filterWrapper = (label)=>{

    const labelObject = filterParams[label]

    const {onChangeFn,list} = labelObject;

    return(

      <Box>
        {/* <Text fontSize={'13px'}> {label} </Text> */}
        <ReactSelect 
         isClearable
         name={label}
         styles={{input:(styles)=>({...styles,minWidth:'85px'})}} 
         onChange={onChangeFn} options={list} 
         placeholder={label}
        />
      </Box>
    )
  
  }


  return (
  <Box mt='1em'>

    <Flex gap={{'base':'1em',lg:'1.5em'}}>

      {filterWrapper('User')}

      {filterWrapper('Country')}

    </Flex>
    <div className="chart" ref={chartDiv}/>

  </Box>
  )
};

export default MongoChart;