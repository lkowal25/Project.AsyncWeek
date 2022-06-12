import React from 'react';

//multiList
import Section from './AccordianComponent';

function CustomRestaurantSections() {
  return (
    <div className="preferences">
      <Section title="Menu" defaultExpanded="true">
        <label>
          <input type="checkbox" /> Use dark theme
        </label>
        <label>
          <input type="checkbox" /> Use internet connection to download
          resources
        </label>
        <br />
        <br />
      </Section>
      <Section title="Pictures">
        <label>
          <input type="checkbox" /> Open the application when you log into the
          computer
        </label>
        <br />
        <br />
        <br />
        <br />
      </Section>
      <Section title="Videos" collapsedHeight="32">
        <i>
          Now you can get notifications to your smart watch!&nbsp;
          <a href="#">Learn more</a>
        </i>
        <br />
        <br />
        <label>
          <input type="checkbox" /> Notify me task statuses via SMS
        </label>
        <br />
        <br />
      </Section>
    </div>
  );
}
export default CustomRestaurantSections;
