import React from "react"; 
import Skeleton ,{SkeletonTheme} from 'react-loading-skeleton' ;
import HorizontalScroll from "./HorizontalScroll";
const SkeletonCard = () => {
    return (
     <>
     <HorizontalScroll>
      <div className="skeleton-card">
        <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={300} width={200} duration={2}/>
        </SkeletonTheme>
      </div>
      <div className="skeleton-card">
        <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={300} width={200} duration={2}/>
        </SkeletonTheme>
      </div>
      <div className="skeleton-card">
        <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={300} width={200} duration={2}/>
        </SkeletonTheme>
      </div>
      <div className="skeleton-card">
        <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={300} width={200} duration={2}/>
        </SkeletonTheme>
      </div>
      <div className="skeleton-card">
        <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={300} width={200} duration={2}/>
        </SkeletonTheme>
      </div>
      <div className="skeleton-card">
        <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={300} width={200} duration={2}/>
        </SkeletonTheme>
      </div>
      <div className="skeleton-card">
        <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={300} width={200} duration={2}/>
        </SkeletonTheme>
      </div>
      <div className="skeleton-card">
        <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={300} width={200} duration={2}/>
        </SkeletonTheme>
      </div>
      <div className="skeleton-card">
        <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={300} width={200} duration={2}/>
        </SkeletonTheme>
      </div>
  
      </HorizontalScroll>
      </>
      )
}
export default SkeletonCard;



