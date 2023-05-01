interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartDescription {
  requirements: string[];
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

interface PartProps {
  coursePart: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

const Part = (props: PartProps): JSX.Element => {
  switch (props.coursePart.kind) {
    case "basic":
      return (
        <div>
          <p>
            <strong>{props.coursePart.name} {props.coursePart.exerciseCount}</strong><br /><em>{props.coursePart.description}</em>
          </p>
        </div>
      )
    case "group":
      return (
        <div>
          <p>
            <strong>{props.coursePart.name} {props.coursePart.exerciseCount}</strong><br />project exercises: {props.coursePart.groupProjectCount}
          </p>
        </div>
      )
    case "background":
      return (
        <div>
          <p>
            <strong>{props.coursePart.name} {props.coursePart.exerciseCount}</strong><br /><em>{props.coursePart.description}</em>
            <br />submit to: {props.coursePart.backgroundMaterial}
          </p>
        </div>
      )
    case "special":
      // eslint-disable-next-line no-case-declarations
      const specialPart = props.coursePart;
      return (
        <div>
          <p>
            <strong>{props.coursePart.name} {props.coursePart.exerciseCount}</strong><br /><em>{props.coursePart.description}</em>
            <br />required skills: {props.coursePart.requirements.map(v => {
              if (specialPart.requirements.indexOf(v) === specialPart.requirements.length - 1) {
                return v
              }
              return v + ", "
              })}
          </p>
        </div>
      )
    default:
      return assertNever(props.coursePart);
  }
};

export default Part;
