const fs = require('fs');

function countStudents(path) {
  try {
    if (!fs.existsSync(path)) throw new Error('Cannot load the database');
    if (!fs.statSync(path).isFile())
      throw new Error('Cannot load the database');

    const data = fs.readFileSync(path, 'utf8').trim().toString('uft8');
    const lines = data.split('\n').filter((line) => line.trim() !== '');
    delete lines[0];

    const students = {};
    lines.forEach((line) => {
      const fields = line.split(',');
      const field = fields[fields.length - 1].trim();
      if (field in students) {
        students[field].count += 1;
        students[field].names.push(fields[0]);
      } else {
        students[field] = { count: 1, names: [fields[0]] };
      }
    });

    console.log(`Number of students: ${lines.length - 1}`);
    for (const field in students) {
      console.log(
        `Number of students in ${field}: ${
          students[field].count
        }. List: ${students[field].names.join(', ')}`,
      );
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = countStudents;
