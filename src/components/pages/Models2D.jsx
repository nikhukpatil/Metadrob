import React, { useRef, useEffect, useState } from 'react';

const Models2D = () => {
    const canvasRef = useRef(null);
    const [rotationSpeeds, setRotationSpeeds] = useState({
        cone: 0.01,
        cube: 0.01,
        hexagon: 0.01,
    });
    const [visibility, setVisibility] = useState({
        cone: true,
        cube: true,
        hexagon: true,
    });
    const angles = useRef({
        cone: 0,
        cube: 0,
        hexagon: 0,
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const drawObject = (x, y, angle, shape) => {
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(angle);

                switch (shape) {
                    case 'cone':
                        ctx.beginPath();
                        ctx.moveTo(0, -30);
                        ctx.lineTo(25, 30);
                        ctx.lineTo(-25, 30);
                        ctx.closePath();
                        ctx.fillStyle = 'red';
                        ctx.fill();
                        break;
                    case 'cube':
                        ctx.fillStyle = 'green';
                        ctx.fillRect(-30, -30, 60, 60);
                        break;
                        case 'hexagon':
                            ctx.beginPath();
                            ctx.moveTo(30, 0);
                            ctx.lineTo(15, 26);
                            ctx.lineTo(-15, 26);
                            ctx.lineTo(-30, 0);
                            ctx.lineTo(-15, -26);
                            ctx.lineTo(15, -26);
                            ctx.closePath();
                            ctx.fillStyle = 'orange';
                            ctx.fill();
                            break;
                    default:
                        break;
                }

                ctx.restore();
            };

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 5;

            if (visibility.cone) {
                drawObject(centerX - 300, centerY, angles.current.cone, 'cone');
                angles.current.cone += rotationSpeeds.cone;
            }

            if (visibility.cube) {
                drawObject(centerX, centerY, angles.current.cube, 'cube');
                angles.current.cube += rotationSpeeds.cube;
            }

            if (visibility.hexagon) {
                drawObject(centerX + 300, centerY, angles.current.hexagon, 'hexagon');
                angles.current.hexagon += rotationSpeeds.hexagon;
            }

            requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [rotationSpeeds, visibility]);

    const handleSpeedChange = (e, object) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value) && value >= 0) {
            setRotationSpeeds(prevSpeeds => ({ ...prevSpeeds, [object]: value }));
        }
    };

    const handleVisibilityToggle = (object) => {
        setVisibility(prevVisibility => ({ ...prevVisibility, [object]: !prevVisibility[object] }));
    };

    return (
        <div className="h-screen">
            <div className="flex flex-col md:flex-row justify-center items-center gap-10 p-4 w-full">
                {['cone', 'cube', 'hexagon'].map((object) => (
                    <div key={object} className="border-2 rounded-lg p-3 w-64">
                        <button className="bg-blue-500 text-white px-2 py-1 rounded-md" onClick={() => handleVisibilityToggle(object)}>Toggle {object}</button>
                        <div className="mt-2">
                            <span>Rotation Speed:</span>
                            <div className="flex items-center gap-4">
                                <input
                                    type='range'
                                    min='0'
                                    max='10'
                                    step='1'
                                    className={`bg-gray-300 w-1/2 ${object}-speed-input`}
                                    defaultValue={rotationSpeeds[object]}
                                    onChange={(e) => handleSpeedChange(e, object)}
                                />
                                <input
                                    type='number'
                                    min='0'
                                    step='0.001'
                                    className={`bg-gray-300 px-2 py-1 w-20 ${object}-speed-input`}
                                    defaultValue={rotationSpeeds[object]}
                                    onChange={(e) => handleSpeedChange(e, object)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <canvas ref={canvasRef} className="p-4 bg-[#33334C] w-full h-full" />
        </div>
    );
};

export default Models2D;
