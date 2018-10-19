import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";

const EditMultipleChoice = ({ name, item, classes }) => {
  return (
    <Card className={classes.card}>
      <Typography className={classes.text} color="textSecondary">
        Multiple Choice
      </Typography>
      <Typography className={classes.text} variant="subtitle2">
        {item.content.question}
      </Typography>
      <Chip
        variant="outlined"
        label={item.content.answers.correctAnswer}
        icon={<DoneIcon />}
        className={classes.text}
      />
      <Chip
        variant="outlined"
        label={item.content.answers.incorrectAnswer1}
        className={classes.text}
      />
      <Chip
        variant="outlined"
        label={item.content.answers.incorrectAnswer2}
        className={classes.text}
      />
      <Chip
        variant="outlined"
        label={item.content.answers.incorrectAnswer3}
        className={classes.text}
      />
    </Card>
  );
};

export default EditMultipleChoice;
