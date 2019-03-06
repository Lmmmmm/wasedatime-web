import React from 'react';
import MediaQuery from 'react-responsive';
import styled from 'styled-components';

import AddedCourseListSwitch from '../../containers/syllabus/AddedCourseListSwitch';
import FetchedCourseListSearch from '../../containers/syllabus/FetchedCourseListSearch';
import { RowWrapper } from '../../styled-components/Wrapper';
import { SideBar } from '../../styled-components/SideBar';
import { sizes } from '../../styled-components/utils';
import withFetchCourses from '../../hocs/withFetchCourses';
import PropTypes from 'prop-types';

const ExtendedRowWrapper = styled(RowWrapper)`
  flex: 1 0 0;
`;

const SyllabusSearch = props => {
  const { addedCourses, fetchedCourses } = props;
  return (
    <ExtendedRowWrapper>
      <MediaQuery minWidth={sizes.tablet}>
        {matches =>
          matches && (
            <SideBar flexBasis="21em">
              <AddedCourseListSwitch addedCourses={addedCourses} />
            </SideBar>
          )
        }
      </MediaQuery>
      <FetchedCourseListSearch fetchedCourses={fetchedCourses} />
    </ExtendedRowWrapper>
  );
};

export default withFetchCourses(SyllabusSearch);
