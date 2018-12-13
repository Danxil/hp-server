export default (sequelize, DataTypes) => {
  const Tariff = sequelize.define('Tariffs', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    minInvestment: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    percentage: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    name: {
      singular: 'tariff',
      plural: 'tariffs',
    },
  });
  Tariff.associate = () => {
    // associations can be defined here
  };
  return Tariff;
};
