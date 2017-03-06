import React, { PropTypes } from 'react'

import OfficialCard from './OfficialCard'
import { Grid, Row, Col } from 'react-flexbox-grid'
import Subheader from 'material-ui/Subheader'

const Division = ({division}) => {
  return (
    <Grid>
      <Subheader>{division.name.toUpperCase()}</Subheader>

      <Row>
        {division.offices.map(office => {
          return office.officials.map(official =>
            <Col xs sm md lg key={official.name}>
              <OfficialCard
                  official={official}
                  office={office} />
            </Col>
          )
         })}
      </Row>
    </Grid>
  )
}

export default Division