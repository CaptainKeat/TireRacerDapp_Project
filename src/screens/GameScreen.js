import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Matter from 'matter-js';
import { GameEngine } from 'react-native-game-engine';

const { width, height } = Dimensions.get('window');

// Create a basic tire object with Matter.js
const createTire = (world) => {
  const tire = Matter.Bodies.circle(width / 2, height / 2, 20, {
    friction: 0.05,
    restitution: 0.9,
  });
  Matter.World.add(world, tire);
  return tire;
};

// Track segments logic (for an endless feel)
const createTrackSegment = (world, x, y, width) => {
  const segment = Matter.Bodies.rectangle(x, y, width, 30, { isStatic: true });
  Matter.World.add(world, segment);
  return segment;
};

const GameScreen = () => {
  const engine = Matter.Engine.create();
  const world = engine.world;
  
  // Setup tire and initial track segment
  const tire = createTire(world);
  const initialSegment = createTrackSegment(world, width / 2, height - 50, width);

  useEffect(() => {
    // Start game loop
    const gameLoop = setInterval(() => {
      Matter.Engine.update(engine, 1000 / 60); // 60 FPS
    }, 1000 / 60);

    return () => clearInterval(gameLoop);
  }, []);

  return (
    <View style={styles.container}>
      <GameEngine
        systems={[]}
        entities={{
          tire: { body: tire, size: [40, 40], color: 'black', renderer: Tire },
          trackSegment: { body: initialSegment, size: [width, 30], color: 'gray', renderer: TrackSegment }
        }}
        style={styles.gameEngine}
      />
      <Text style={styles.distance}>Distance: 0m</Text>
    </View>
  );
};

// Tire and Track components for rendering
const Tire = ({ size, body }) => {
  const { position } = body;
  return (
    <View
      style={{
        position: 'absolute',
        width: size[0],
        height: size[1],
        left: position.x - size[0] / 2,
        top: position.y - size[1] / 2,
        borderRadius: size[0] / 2,
        backgroundColor: 'black',
      }}
    />
  );
};

const TrackSegment = ({ size, body }) => {
  const { position } = body;
  return (
    <View
      style={{
        position: 'absolute',
        width: size[0],
        height: size[1],
        left: position.x - size[0] / 2,
        top: position.y - size[1] / 2,
        backgroundColor: 'gray',
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB', // Sky-like background color
  },
  gameEngine: {
    position: 'absolute',
    width: width,
    height: height,
  },
  distance: {
    position: 'absolute',
    top: 40,
    left: 20,
    fontSize: 18,
    color: '#fff',
  },
});

export default GameScreen;
