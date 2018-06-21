import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { highlight } from '../../utils/react';
import { media } from '../../utils/styledComponents';
import fseIcon from '../../../img/syllabus-icons/fse.png';
import cseIcon from '../../../img/syllabus-icons/cse.png';
import aseIcon from '../../../img/syllabus-icons/ase.png';
import pseIcon from '../../../img/syllabus-icons/pse.png';
import silsIcon from '../../../img/syllabus-icons/sils.png';
import cjlIcon from '../../../img/syllabus-icons/cjl.png';


const RowWrapper = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  overflow-y: hidden;
`;

const CourseItemWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  align-items: stretch;
  background-color: #fff;
  border: none;
  margin: 3px 0;
  padding: 9px 12px;
  width: 100%;
`;

const StyledHeading = styled('h3')`
  margin: 0;
  text-align: left;
  font-size: 1.2em;
  ${media.phone`font-size: 1.1em;`};
  font-weight: 600;
  color: #000;
`;

const CourseItemRow = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const IconBadgeWrapper = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`

const SchoolIconList = styled('ul')`
  display: flex;
  flex-direction: row;
  margin: .1em 0;
  padding: 0;
  list-style: none;
  list-style-type: none;
`;

const SchoolIconItem = styled('li')`
  display: flex;
  margin: 0 .3em 0 0;
  padding: 0;
`;

const SchoolIconImage = styled('img')`
  height: 30px;
`;

const Badge = styled('span')`
  display: inline-block;
  background-color: #666;
  color: #fff;
  padding: .15em .3em;
  border: none;
  border-radius: .2em;
  font-size: .8em;
  margin: .1em .3em .1em 0;
`

const KeywordList = SchoolIconList.extend`
  flex-wrap: wrap;
`

const InvisibleButton = styled('button')`
  align-self: flex-start;
  background-color: #fff;
  border: none;
  padding: 0;
`

const DescriptionWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 1.2em;
  ${media.phone`font-size: 1.1em;`};
`;

const Description = styled('div')`
  flex: 1 0 auto;
  text-align: left;
`;

const OccurrenceList = styled('ul')`
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: left;
`;

const schoolNameIconMap = {
  'FSE': fseIcon,
  'CSE': cseIcon,
  'ASE': aseIcon,
  'PSE': pseIcon,
  'SILS': silsIcon,
  'CJL': cjlIcon
};

const mapSchooNameToSchoolIcon = schoolNames => {
  return schoolNames.map(schoolName => {
    return (
      <SchoolIconItem key={schoolName}>
        <SchoolIconImage src={schoolNameIconMap[schoolName]} />
      </SchoolIconItem>
    );
  });
};

const combineYearTerm = (year, term) => {
  return `${year} ${term}`;
};

const getDay = day => {
  switch (day) {
    case 1:
      return 'Mon.';
    case 2:
      return 'Tue.';
    case 3:
      return 'Wed.';
    case 4:
      return 'Thur.';
    case 5:
      return 'Fri.';
    case 6:
      return 'Sat.';
    case 7:
      return 'Sun.';
    default:
      return '';
  }
};

const getLocation = (building, classroom) => {
  if (building === '-1') {
    return classroom;
  } else {
    return `${building}-${classroom}`;
  }
};

const getPeriod = (start_period, end_period) => {
  if (start_period === -1) {
    return 'undecided';
  } else if (start_period === end_period) {
    return `${start_period}`;
  } else {
    return `${start_period}-${end_period}`;
  }
};

const CourseItem = ({ searchTerm, course, style }) => {
  const title = highlight(searchTerm, course.title);
  const instructor = highlight(searchTerm, course.instructor);
  const yearTerm = combineYearTerm(course.year, course.term);
  const schoolIcons = mapSchooNameToSchoolIcon(course.schools);
  const syllabusLink = course.links[0].link;
  //Need to use index as keys due to Waseda's data.
  const occurrences = course.occurrences.map((occurrence, index) => {
    const day = getDay(occurrence.day);
    const period = getPeriod(occurrence.start_period, occurrence.end_period);
    const location = getLocation(occurrence.building, occurrence.classroom);
    return (
      <li key={index}>
        <span>
          <i className="fas fa-clock fa-1x"></i>&nbsp;{`${day}${period}`}&nbsp;&nbsp;
          <i className="fas fa-map-marker-alt fa-1x"></i>&nbsp;{`${location}`}
        </span>
      </li>
    );
  });
  const keywords = "keywords" in course ?
    course.keywords.map((keyword, index) => {
      return (
        <li key={keyword} style={{display: "inline-block"}}>
          <Badge>
            {keyword === "English-based Undergraduate Program" ?
              "EN-based Undergrad Program" :
              keyword
            }
          </Badge>
        </li>
      );
    }) :
    null;
  const keywordsList = keywords !== null ?
    <KeywordList>{keywords}</KeywordList> :
    null;

  return (
    <RowWrapper style={style}>
      <CourseItemWrapper>
        <StyledHeading>
          {title}
        </StyledHeading>
        <CourseItemRow>
          <IconBadgeWrapper>
            <SchoolIconList>{schoolIcons}</SchoolIconList>
            <Badge>{course.lang}</Badge>
            {keywordsList}
          </IconBadgeWrapper>
          <div style={{display: "flex", flex: "1 0 auto", justifyContent: "flex-end"}}>
            <a style={{alignSelf: "flex-start"}} href={`https://www.wsl.waseda.jp/syllabus/JAA104.php?pKey=${syllabusLink}&pLng=en`} target="_blank">
              <i style={{color: "#6495ED"}} className="fas fa-external-link-square-alt fa-2x" data-fa-transform="shrink-2"></i>
            </a>
            <InvisibleButton>
              <i style={{color: "#48af37"}} className="fas fa-plus-circle fa-2x" data-fa-transform="shrink-2"></i>
            </InvisibleButton>
          </div>
        </CourseItemRow>
        <DescriptionWrapper>
          <Description>{yearTerm}</Description>
          <Description>
            <OccurrenceList>{occurrences}</OccurrenceList>
          </Description>
          <Description>{instructor}</Description>
        </DescriptionWrapper>
      </CourseItemWrapper>
    </RowWrapper>
  );
};

export default CourseItem;

CourseItem.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  course: PropTypes.object.isRequired,
  style: PropTypes.object.isRequired
};
