import React, { Component } from "react";
import { Timeline } from "react-twitter-widgets";

class Locals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      office: [],
      personOfficeInfo: []
    };
  }

  componentDidMount() {
    fetch(
      "https://www.googleapis.com/civicinfo/v2/representatives?address=line%20st.%2030032&includeOffices=true&key=AIzaSyB3cRW6zO8D3INc-NHDFA-0ck77gQAYpOU",
      { headers: { "Content-Type": "application/json; charset=utf-8" } }
    )
      .then(response => response.json())
      .then(results => {
        let newResults = Object.values(results); // newResults will be json response array of the users civic representives at each elected level of government.
        console.log(newResults);
        let officesArray = newResults[3]; // officesArray equals the names of the office and info about that office for each level of elected government and its
        console.log(newResults[3]);
        console.log(newResults[4]);
        let personInfoArray = newResults[4]; // personInfoArray is the names and info for the person who currently has been elected to the seat of the newResults array.
        let masterArray = [];
        console.log(newResults[3][0].divisionId);
        officesArray.forEach(office => {
          if (
            office.divisionId ===
            "ocd-division/country:us/state:ga/county:dekalb"
          ) {
            //   console.log(office.name);
            //   console.log(office.officialIndices);
            office.officialIndices.forEach(index => {
              // console.log(personInfoArray[index]);
              let personInfo = personInfoArray[index];
              let TwitterHandle;
              if (personInfoArray[index].channels) {
                // console.log("fart machine");
                personInfo.channels.forEach(index2 => {
                  if (index2.type === "Twitter") {
                    // console.log("hey buddy!");
                    // console.log(index2.id);
                    let theirTwitterHandle = index2.id;
                    TwitterHandle = theirTwitterHandle;
                    return TwitterHandle;
                  }
                });
              }
              let personOfficeInfo = {
                officeName: office.name,
                personName: personInfo.name,
                address: personInfo.address[0],
                party: personInfo.party,
                phoneNumber: personInfo.phones[0],
                twitter: TwitterHandle
              };
              masterArray.push(personOfficeInfo);
            });
          }
        });

        this.setState({
          personOfficeInfo: masterArray
        });
        // console.log(this.state.items[0]);
      });

    // fetch(
    //   "https://www.googleapis.com/civicinfo/v2/elections?&key=AIzaSyB3cRW6zO8D3INc-NHDFA-0ck77gQAYpOU",
    //   { headers: { "Content-Type": "application/json; charset=utf-8" } }
    // )
    //   .then(response => response.json())
    //   .then(data => console.log(data));
  }

  render() {
    console.log(this.state.personOfficeInfo);
    let officeNames = this.state.personOfficeInfo.map(function(item, index) {
      console.log(item.twitter);
      if (item.address.line2 && item.twitter) {
        return (
          <div>
            <ul>
              <li key={index}>
                {item.personName}
                <br />
                {item.officeName}
                <br />
                {item.address.line1} <br />
                {item.address.line2} <br />
                {item.address.city}, {item.address.state} {item.address.zip}
                <br />
                {item.party}
                <br />
                {item.phoneNumber}
                <div>
                  <Timeline
                    dataSource={{
                      sourceType: "profile",
                      screenName: item.twitter
                    }}
                    options={{
                      username: item.twitter,
                      height: "400",
                      width: "60%"
                    }}
                    onLoad={() => console.log("Timeline is loaded!")}
                  />
                </div>
              </li>
            </ul>
          </div>
        );
      }
      if (item.address.line2 && item.twitter === undefined) {
        return (
          <div>
            <ul>
              <li key={index}>
                {item.personName}
                <br />
                {item.officeName}
                <br />
                {item.address.line1} <br />
                {item.address.line2} <br />
                {item.address.city}, {item.address.state} {item.address.zip}
                <br />
                {item.party}
                <br />
                {item.phoneNumber}
              </li>
            </ul>
          </div>
        );
      }
      if (!item.address.line2 && item.twitter) {
        return (
          <div>
            <ul>
              <li key={index}>
                {item.personName}
                <br />
                {item.officeName}
                <br />
                {item.address.line1} <br />
                {item.address.city}, {item.address.state} {item.address.zip}
                <br />
                {item.party}
                <br />
                {item.phoneNumber}
                <div>
                  <Timeline
                    dataSource={{
                      sourceType: "profile",
                      screenName: item.twitter
                    }}
                    options={{
                      username: item.twitter,
                      height: "400",
                      width: "60%"
                    }}
                    onLoad={() => console.log("Timeline is loaded!")}
                  />
                </div>
              </li>
            </ul>
          </div>
        );
      }
      if (item.twitter === undefined) {
        return (
          <ul key={index}>
            {item.personName}
            <br />
            {item.officeName}
            <br />
            {item.address.line1} <br />
            {item.address.city}, {item.address.state} {item.address.zip}
            <br />
            {item.party}
            <br />
            {item.phoneNumber}
          </ul>
        );
      }
    });
    return (
      <div>
        <div>{officeNames}</div>
      </div>
    );
  }
}

export default Locals;
