import './ExploreContainer.css';
import Button from './Button';

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {
  return (
    <div id="container">
      <strong>Just made a change to this field</strong>
      <p>Start with Ionic <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
      <Button><a href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ&themeRefresh=1">Click Me to Get Rick Rolled</a></Button>
    </div>
  );
};

export default ExploreContainer;
