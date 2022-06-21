import React from 'react';
import './Widget.css'
import InfoIcon from '@mui/icons-material/Info';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';





function Widget() {



    const newsArticle = (heading, subtitle) => {
        <div className='widget__article'>
            <div className='widget__articleLeft'>
                <FiberManualRecordIcon />
            </div>
            <div className='widget__articleRight'>
                <h4>{heading}</h4>
                <p>{subtitle}</p>
            </div>
        </div>
    }




    return (
        <div className='widget'>
            <div className='widget__header'>
                <h2>LinkedIn News</h2>
                <InfoIcon />

            </div>
            {/* Need to work on to fix it */}
            {/*        newsArticle("Software engineer", "Top news")          */}
            <div className='widget__article'>
                <div className='widget__articleLeft'>
                    <FiberManualRecordIcon />
                </div>
                <div className='widget__articleRight'>
                    <h4>Software engineering</h4>
                    <p>Top news for this year</p>
                </div>
            </div>
            <div className='widget__article'>
                <div className='widget__articleLeft'>
                    <FiberManualRecordIcon />
                </div>
                <div className='widget__articleRight'>
                    <h4>Apple new product iCar</h4>
                    <p>This year</p>
                </div>
            </div>
            <div className='widget__article'>
                <div className='widget__articleLeft'>
                    <FiberManualRecordIcon />
                </div>
                <div className='widget__articleRight'>
                    <h4>Elon to go on Mars</h4>
                    <p>By year 2030</p>
                </div>
            </div>
            <div className='widget__article'>
                <div className='widget__articleLeft'>
                    <FiberManualRecordIcon />
                </div>
                <div className='widget__articleRight'>
                    <h4>Web Development</h4>
                    <p>Top news for this year</p>
                </div>
            </div>
            <div className='widget__article'>
                <div className='widget__articleLeft'>
                    <FiberManualRecordIcon />
                </div>
                <div className='widget__articleRight'>
                    <h4>Full stack developer</h4>
                    <p>Top news for this year</p>
                </div>
            </div>




        </div>
    );
}

export default Widget;
