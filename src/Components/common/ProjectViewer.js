import React from "react";
import Modal from "react-modal";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const ProjectViewer = ({ title, open, toggleModal, achievements }) => {
  const style = {
    content: {
      padding: "50px",
    },
  };

  const achievementGroups = [...new Set(achievements.map((_) => _.group))];
  const SectionAchievementList = ({ tasksDoneInAchievement }) => {
    return (
      tasksDoneInAchievement &&
      tasksDoneInAchievement.map((sectionAchievement, i) => {
        return (
          <div key={sectionAchievement.title} className="projectViewer">
            <div className="projectViewer__sectionAchievementTitle">
              <h3>{sectionAchievement.title}</h3>
              <span></span>
              <em className="date">{sectionAchievement.when}</em>
            </div>
            <div className="projectViewer__sectionAchievement">
              <img
                alt={`${sectionAchievement.title}`}
                src={
                  process.env.PUBLIC_URL +
                  "/images/portfolio/" +
                  sectionAchievement.image
                }
              />
              {Array.isArray(sectionAchievement.description) ? (
                sectionAchievement.description.map((_) => <div>&bull; {_}</div>)
              ) : (
                <p>{sectionAchievement.description}</p>
              )}
              {i !== sectionAchievement.Length - 1 && <br />}
            </div>
          </div>
        );
      })
    );
  };

  return (
    <section id="projectView">
      <Modal isOpen={open} style={style}>
        <div id="return" style={{ cursor: "pointer" }}>
          <a className="smoothscroll" title="Return to website">
            <i className="icon-left-circle" onClick={() => toggleModal()}></i>
          </a>
        </div>

        <div className="projectViewer__title">
          <h1>{title}</h1>
        </div>
        <section id="resume">
          <div className="nine columns main-col">
            <Tabs>
              <TabList>
                {achievementGroups.map((_) => (
                  <Tab key={`All achievements relating to ${_}.`}>{_}</Tab>
                ))}
              </TabList>
              {achievementGroups.map((group) => {
                const achievementsInGroup = achievements.filter(
                  (_) => _.group === group
                );
                return (
                  <TabPanel>
                    <Tabs>
                      <TabList>
                        {achievementsInGroup.map((_) => (
                          <Tab key={`Achievement title: ${_.title} `}>
                            {_.title}
                          </Tab>
                        ))}
                      </TabList>
                      {achievementsInGroup.map((_) => (
                        <TabPanel key={`Achivements in ${_.title}.`}>
                          <SectionAchievementList
                            tasksDoneInAchievement={_.tasksDoneInAchievement}
                          />
                        </TabPanel>
                      ))}
                    </Tabs>
                  </TabPanel>
                );
              })}
            </Tabs>
          </div>
        </section>
        <div className="projectViewer__closeButton">
          <button onClick={() => toggleModal()}>Close</button>
        </div>
      </Modal>
    </section>
  );
};

export default ProjectViewer;
