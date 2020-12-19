import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import moment from "moment";
import LinkModal from "./LinkModal";
import EditModal from "./EditModal";
import AddTagModal from "./AddTagModal";
import { updateLink, getLinksByTag } from "../api";

// need a function that takes a link_id and gets the link by that Id, then updates the clicks column in the links table by one every time its clicked on the front end. Then I can call getAllLinks()
// create the route,

const DisplayLinks = ({ links, setLinks, setTags }) => {
  // console.log("links inside of DisplayLink", links);
  //const [clickCount, setClickCount] = useState(false)

  return (
    <div className="cardContainer">
      <LinkModal links={links} setLinks={setLinks} setTags={setTags} />

      {links.map((link) => {
        const { name, description, clicks, link_id, date, tags } = link;
        // console.log('link_id in DisplayLinks: ', link_id)
        return (
          <Card key={link_id} className="text-center">
            <Card.Body>
              <Card.Title>
                <a
                  rel="noopener noreferrer"
                  href={"#"} /*href={name}  target='_blank' */
                >
                  <Button
                    onClick={async () => {
                      // setClickCount(true)
                      //  console.log('this is clickCount in my handeler: ', clickCount)
                      const updatedLinks = await updateLink(
                        "",
                        "",
                        "",
                        link_id,
                        true
                      );
                      setLinks(updatedLinks);
                    }}
                  >
                    {name}
                  </Button>
                </a>
              </Card.Title>
              <span className="text-muted">
                {" "}
                {clicks} shares since {moment(date).format("MMMM Do YYYY")}
              </span>
              <Card.Text>
                {description} -{" "}
                {tags.map((tag) => {
                  return (
                    <Button
                      key={tag}
                      id="tagButton"
                      onClick={async () => {
                        setLinks(await getLinksByTag(tag));
                      }}
                    >
                      {tag}
                    </Button>
                  );
                })}{" "}
                <AddTagModal
                  link_id={link_id}
                  setLinks={setLinks}
                  setTags={setTags}
                />
              </Card.Text>
              <EditModal link_id={link_id} setLinks={setLinks} />
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default DisplayLinks;
